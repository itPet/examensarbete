import { LocalGameDataService } from './../services/local-game-data.service';
import { PlacesService, Place } from './../services/places.service';
import { Router } from '@angular/router';
import { ServerService, Player } from './../services/server.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

  players: Player[];
  lostPlayer: string;
  navigate = true;
  assignRoles = true;
  subscription: Subscription;

  constructor(private server: ServerService,
    private router: Router,
    private localData: LocalGameDataService) { }

  ngOnInit() {
    this.subscription = this.server.getPlayers().subscribe(res => {
      let allReady = true;
      let playerRole: string = null;
      this.players = res;
      this.players.forEach(player => {
        if (!player.ready) {
          allReady = false;
        }
        if (player.name === this.localData.getPlayerName()) {
          if (player.role !== null) {
            playerRole = player.role;
            this.localData.setPlayerRole(player.role);
          }
        }
        if (player.role === 'lost') {
          console.log('Lost player role set');
          this.localData.setLostPlayer(player.name);
        } else if (player.role === 'unique') {
          this.localData.setUniquePlayer(player.name);
        }
      });

      if (allReady) {
        const playerNames: string[] = [];
        this.players.forEach(p => {
          playerNames.push(p.name);
        });
        this.localData.setPlayerNames(playerNames);
      }

      if (allReady && this.assignRoles && this.localData.isHost()) {
        this.assignRoles = false;
        this.server.setGameStartedStatus(true);
        this.randomizeRoles();
      }

      if (this.localData.getLostPlayer() === undefined || this.localData.getUniquePlayer() === undefined) {
        this.navigate = false;
      } else {
        this.navigate = true;
      }

      if (playerRole !== null && playerRole === 'lost' && this.navigate) {
        console.log('navigate as lost');
        this.navigate = false;
        this.router.navigateByUrl('/game-play/tabs/(places:places)');
      } else if (playerRole !== null && this.navigate) {
        console.log('navigate as not lost');
        this.navigate = false;
        this.router.navigateByUrl('/game-play/tabs/(places:place-details/' + this.localData.getChosenPlace().name);
      }
    });
  }

  ionViewWillLeave() {
    console.log('will leave score page');
    this.subscription.unsubscribe();
  }

  readyToPlay() {
    this.server.setPlayerReadyStatus(true);
  }

  randomizeRoles() {
    const playerNums: number[] = [];
    for (let index = 0; index < this.players.length; index++) {
      playerNums.push(index);
    }
    const uniqueNum = playerNums[(Math.floor(Math.random() * playerNums.length))];
    playerNums.splice(uniqueNum, 1);
    const lostNum = playerNums[(Math.floor(Math.random() * playerNums.length))];
    this.server.setPlayerRoles(this.players, this.players[uniqueNum].name, this.players[lostNum].name);
  }

}

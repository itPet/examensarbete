import { PlacesService, Place } from './../services/places.service';
import { Router } from '@angular/router';
import { ServerService, Player } from './../services/server.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

  players: Player[];
  lostPlayer: string;
  chosenPlace: Place;
  navigate = true;
  assignRoles = true;
  subscription;

  constructor(private server: ServerService,
    private router: Router,
    private plService: PlacesService) { }

  ngOnInit() {
    this.subscription = this.server.getPlayers().subscribe(async res => {
      let allReady = true;
      let playerRole: string = null;
      this.players = res;
      this.players.forEach(player => {
        if (!player.ready) {
          allReady = false;
        }
        if (player.name === this.server.getPlayerName()) {
          if (player.role !== null) {
            playerRole = player.role;
          }
        }
      });

      if (allReady && this.assignRoles && this.server.isHost()) {
        console.log('allReady && assignRoles are true');
        this.assignRoles = false;
        this.server.setGameStartedStatus(true);
        const gameDoc = await this.server.getGameDoc().toPromise();
        await this.randomPlaceAndRoles(gameDoc.data().placeGroupNames);
      }

      if (playerRole !== null && playerRole === 'lost' && this.navigate) {
        console.log('navigate as lost');
        this.navigate = false;
        this.router.navigateByUrl('/game-play/tabs/(places:places)');
      } else if (playerRole !== null && this.navigate) {
        console.log('navigate as not lost');
        this.navigate = false;
        const gameDoc = await this.server.getGameDoc().toPromise();
        this.router.navigateByUrl('/place-details/' + gameDoc.data().chosenPlace.name);
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

  randomPlaceAndRoles(placeGroupNames: string[]) {
    // random place
    const places: Place[] = this.plService.getPlaces(placeGroupNames);
    console.log('places: ' + places);
    this.chosenPlace = places[(Math.floor(Math.random() * places.length))];
    console.log('chosenPlace: ' + this.chosenPlace);
    this.server.setChosenPlace(this.chosenPlace);

    // random roles
    const playerNums: number[] = [];
    for (let index = 0; index < this.players.length; index++) {
      playerNums.push(index);
    }
    console.log('playerNums after forloop: ' + playerNums);
    const uniqueNum = playerNums[(Math.floor(Math.random() * playerNums.length))];
    console.log('unique num: ' + uniqueNum);
    playerNums.splice(uniqueNum, 1);
    console.log('playerNums after splice: ' + playerNums);
    const lostNum = playerNums[(Math.floor(Math.random() * playerNums.length))];
    console.log('lostNum: ' + lostNum);
    this.server.setPlayerRoles(this.players, this.players[uniqueNum].name, this.players[lostNum].name, this.chosenPlace);
  }

}

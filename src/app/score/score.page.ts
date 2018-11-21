import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ServerService, Player } from './../services/server.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

  players: Player[];

  constructor(private server: ServerService, private router: Router) { }

  ngOnInit() {
    console.log('score ngOnInit()');
    this.server.getPlayerList().subscribe(res => {
      let allReady = true;
      this.players = res;
      this.players.forEach(player => {
        if (!player.ready) {
          allReady = false;
        }
      });
      if (allReady) {
        this.router.navigateByUrl('/game-play/tabs/(home:home)');
      }
    });
  }

  readyToPlay() {
    console.log('ready to play');
    this.server.setReadyStatus(true);
  }

}

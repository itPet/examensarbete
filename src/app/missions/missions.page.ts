import { ServerService } from './../services/server.service';
import { PlacesService, Place } from './../services/places.service';
import { Component, OnInit } from '@angular/core';
import { Player } from '../services/server.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.page.html',
  styleUrls: ['./missions.page.scss'],
})
export class MissionsPage implements OnInit {

  players: Player[];
  player: Player;
  chosenPlace: Place;
  subscription;

  constructor(private server: ServerService) { }

  async ngOnInit() {
    // const playersCollection = await this.server.getPlayersCollect().toPromise();
    // playersCollection.forEach(plDoc => {
    //   this.players.push(plDoc.data() as Player);
    // });
    this.subscription = this.server.getPlayers().subscribe(res => {
      console.log('inside subscription');
      this.players = res;
    });

    const playerDoc = await this.server.getPlayerDoc().toPromise(); // get player
    this.player = playerDoc.data() as Player;
    const gameDoc = await this.server.getGameDoc().toPromise();
    this.chosenPlace = gameDoc.data().chosenPlace as Place;
    console.log('players: ' + this.players);
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave() missions page');
    this.subscription.unsubscribe();
  }
}

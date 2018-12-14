import { Router } from '@angular/router';
import { Place, PlacesService } from './../services/places.service';
import { Component, OnInit } from '@angular/core';
import { ServerService, Player } from '../services/server.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {

  places: Place[];
  chosenPlace: Place;
  player: Player;

  constructor(private server: ServerService,
    private placesService: PlacesService,
    private router: Router) { }

  async ngOnInit() {
    const gameDoc = await this.server.getGameDoc().toPromise();
    this.places = this.placesService.getPlaces(gameDoc.data().placeGroupNames);
    this.chosenPlace = gameDoc.data().chosenPlace as Place;
    console.log('chosenPlace: ' + this.chosenPlace.name);
    const playerDoc = await this.server.getPlayerDoc().toPromise(); // get player
    this.player = playerDoc.data() as Player;
    console.log('player.name: ' + this.player.name + '  player.role: ' + this.player.role);
  }

  toDetailPage(name: string) {
    this.router.navigateByUrl('/place-details/' + name);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Place, PlacesService } from '../services/places.service';
import { ServerService, Player } from '../services/server.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {

  place: Place;
  player: Player;
  iAmHere: boolean;

  constructor(private activadedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private server: ServerService ) { }

  async ngOnInit() {
    const placeName = this.activadedRoute.snapshot.paramMap.get('name'); // get place name from url
    this.place = this.placesService.getPlace(placeName); // get place
    const playerDoc = await this.server.getPlayerDoc().toPromise(); // get player
    this.player = playerDoc.data() as Player;
    const gameDoc = await this.server.getGameDoc().toPromise();
    if (gameDoc.data().chosenPlace.name === this.place.name && this.player.role !== 'lost') {
      this.iAmHere = true;
    }
  }

  ionViewCanEnter() {
    console.log('can enter');
    return false;
  }

}

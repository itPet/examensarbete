import { LocalGameDataService } from './../services/local-game-data.service';
import { Router } from '@angular/router';
import { Place} from './../services/places.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {

  places: Place[];
  chosenPlace: Place;
  playerRole: string;

  constructor(private localData: LocalGameDataService,
    private router: Router) { }

  async ngOnInit() {
    this.chosenPlace = this.localData.getChosenPlace();
    this.playerRole = this.localData.getPlayerRole();
    this.places = this.localData.getPlaces();
  }

  toDetailPage(name: string) {
    this.router.navigateByUrl('/game-play/tabs/(places:place-details/' + name);
  }
}

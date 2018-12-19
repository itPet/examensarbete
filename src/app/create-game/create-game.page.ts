import { LocalGameDataService } from './../services/local-game-data.service';
import { Place } from './../services/places.service';
import { ServerService } from './../services/server.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PlacesService, PlaceGroup } from '../services/places.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.page.html',
  styleUrls: ['./create-game.page.scss'],
})
export class CreateGamePage implements OnInit {

  placeGroups: PlaceGroup[];

  constructor(private router: Router,
    private plService: PlacesService,
    private server: ServerService,
    private localData: LocalGameDataService) { }

  ngOnInit() {
    this.placeGroups = this.plService.getPlaceGroups();
  }

  continueBtnClicked() {
    const chosenPlaceGroups: string[] = this.getPlaceGroupNames();

    // set places
    const places: Place[] = this.plService.getPlaces(chosenPlaceGroups);

    // store to server
    this.server.setPlaceGroupNames(chosenPlaceGroups);
    this.server.setGameStartedStatus(false);

    // store to local data
    this.localData.setPlaces(places);

    this.router.navigateByUrl('/score');
  }

  getPlaceGroupNames(): string[] {
    const groupNames: string[] = [];
    this.placeGroups.forEach(group => {
      if (group.playWithGroup) {
        groupNames.push(group.name);
      }
    });
    return groupNames;
  }

}

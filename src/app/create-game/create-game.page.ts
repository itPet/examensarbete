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

  private placeGroups: PlaceGroup[];

  constructor(private router: Router,
    private places: PlacesService,
    private server: ServerService) { }

  ngOnInit() {
    this.placeGroups = this.places.getPlaceGroups();
  }

  continueBtnClicked() {
    this.server.setGameStartedStatus(true);
    this.server.setPlaceGroupNames(this.getPlaceGroupNames());
    this.router.navigateByUrl('/score');
  }

  getPlaceGroupNames(): string[] {
    const groupNames: string[] = [];
    this.placeGroups.forEach(group => {
      if (group.isChecked) {
        groupNames.push(group.name);
      }
    });
    return groupNames;
  }

}

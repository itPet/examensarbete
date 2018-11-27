import { Router } from '@angular/router';
import { Place, PlacesService } from './../services/places.service';
import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {

  places: Place[];

  constructor(private server: ServerService,
    private placesService: PlacesService,
    private router: Router) { }

  ngOnInit() {
    this.server.getGame().subscribe(res => {
      this.places = this.placesService.getPlaces(res.placeGroupNames);
    });
  }

  toDetailPage(name: string) {
    this.router.navigateByUrl('/place-details/' + name);
  }
}

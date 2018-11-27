import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Place, PlacesService } from '../services/places.service';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {

  place: Place;

  constructor(private activadedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private server: ServerService ) { }

  ngOnInit() {
    const placeName = this.activadedRoute.snapshot.paramMap.get('name');
    this.place = this.placesService.getPlace(placeName);
  }

}

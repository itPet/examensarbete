import { Injectable } from '@angular/core';

export interface Place {
  name: string;
  imgUrl: string;
  info: string;
}

export interface PlaceGroup {
  name: string;
  isChecked: boolean;
  places: Place[];
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private places1: PlaceGroup = {name: 'NT', isChecked: false, places: [
    {name: 'Snickarverkstaden', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
    {name: 'Lejongropen', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
    {name: 'Sinai berg', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
    {name: 'Betesda', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
    {name: 'Fiskebåten', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
    {name: 'Sjön', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
    {name: 'Borgen', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
  ]};
  private places2: PlaceGroup = this.places2 = {name: 'Other', isChecked: false, places: [
    {name: 'Hage', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
    {name: 'Gården', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
    {name: 'Berg', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
    {name: 'Bergspredikan', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
    {name: 'Slätten', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
    {name: 'Åsnedalen', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
  ]};
  private places3: PlaceGroup = this.places3 = {name: 'GT', isChecked: false, places: [
    {name: 'Lägret', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
    {name: 'Israel', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
    {name: 'Dammen', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
    {name: 'Segelbåten', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
    {name: 'Hoppet', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
    {name: 'Getsemane', imgUrl: '../../assets/placesImages/Ephesus.jpg', info: 'bra'},
  ]};
  private placeGroups: PlaceGroup[] = [this.places1, this.places2, this.places3];

  getPlaceGroups() {
      return this.placeGroups;
  }

  getPlaces(names: string[]) {
    const places: Place[] = [];
    names.forEach(name => {
      this.placeGroups.forEach(group => {
        if (name === group.name) {
          group.places.forEach(place => {
            places.push(place);
          });
        }
      });
    });
    return places;
  }

  getPlace(placeName: string): Place {
    let place: Place;
    this.placeGroups.forEach(group => {
      group.places.forEach(pl => {
        if (placeName === pl.name) {
          place = pl;
        }
      });
    });
    return place;
  }

}

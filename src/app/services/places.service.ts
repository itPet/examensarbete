import { Injectable } from '@angular/core';

export interface Place {
  name: string;
  imgUrl: string;
  uniqueRole: string;
  generalRole: string;
  bible: string;
  authors: string;
}

export interface PlaceGroup {
  name: string;
  playWithGroup: boolean;
  places: Place[];
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private places1: PlaceGroup = {name: 'NT', playWithGroup: false, places: [
    {name: 'Brinnande ugnen', imgUrl: '../../assets/placesImages/FieryFurnace.jpg',
    uniqueRole: 'Nebukadnessar', generalRole: 'En av de tre vännerna',
    bible: `Daniel 3:1-27 - Kung Nebukadnessar lät göra en staty av guld... [Han] kallade samman... alla...
     makthavare i provinserna... När ni hör ljudet av.. alla slags instrument, ska ni falla ner och tillbe
    den gyllene statyn... [Nebukadnessar] "Är det sant att ni Shadrak, Meshak och Abed-Nego, inte... tillber
    den gyllene statyn[?]... Om ni inte tillber ska ni i samma stund kastas i den brinnande ugnen, och vilken
    gud kan då rädda er ur mina händer?" [De tre vännerna] "Om det blir så, är vår Gud... mäktig att rädda oss...
    Men om inte, så ska du veta, o konung, att vi ändå inte... tillber guldstatyn..." Då fylldes Nebukadnessar
    av vrede... så att hans ansiktsuttryck förvandlades. Han befallde att man skulle göra ugnen sju gånger hetare...
    Så bands de... och kastades i den brinnande ugnen... Då blev kun Nebukadnessar förskräckt. Han
    reste sig hastigt och frågade sina rådsherrar: "Var det inte tre män vi band och kastade i elden?...
    Men nu ser jag fyra män gå lösa och lediga inne i elde, helt oskadda. Och den fjärde ser ut som en gudason."...
    Man kunde inte ens känna att de luktade bränt.`,
    authors: `PK 509 From his royal seat the king looked on, expecting to see the
    men who had defied him utterly destroyed. But his feelings of triumph suddenly changed. The nobles standing
    near saw his face grow pale as he started from the throne and looked intently into the glowing flames. `},
    {name: 'Brinnande ', imgUrl: '../../assets/placesImages/Ephesus.jpg',
    uniqueRole: 'Nebukadnessar', generalRole: 'En av de tre vännerna',
    bible: `Daniel 3:1-27 - Kung Nebukadnessar lät göra en staty av guld... [Han] kallade samman... alla...
     makthavare i provinserna... När ni hör ljudet av.. alla slags instrument, ska ni falla ner och tillbe
    den gyllene statyn... [Nebukadnessar] "Är det sant att ni Shadrak, Meshak och Abed-Nego, inte... tillber
    den gyllene statyn[?]... Om ni inte tillber ska ni i samma stund kastas i den brinnande ugnen, och vilken
    gud kan då rädda er ur mina händer?" [De tre vännerna] "Om det blir så, är vår Gud... mäktig att rädda oss...
    Men om inte, så ska du veta, o konung, att vi ändå inte... tillber guldstatyn..." Då fylldes Nebukadnessar
    av vrede... så att hans ansiktsuttryck förvandlades. Han befallde att man skulle göra ugnen sju gånger hetare...
    Så bands de... och kastades i den brinnande ugnen... Då blev kun Nebukadnessar förskräckt. Han
    reste sig hastigt och frågade sina rådsherrar: "Var det inte tre män vi band och kastade i elden?...
    Men nu ser jag fyra män gå lösa och lediga inne i elde, helt oskadda. Och den fjärde ser ut som en gudason."...
    Man kunde inte ens känna att de luktade bränt.`,
    authors: `PK 509 From his royal seat the king looked on, expecting to see the
    men who had defied him utterly destroyed. But his feelings of triumph suddenly changed. The nobles standing
    near saw his face grow pale as he started from the throne and looked intently into the glowing flames. `},
    {name: ' ugnen', imgUrl: '../../assets/placesImages/Ephesus.jpg',
    uniqueRole: 'Nebukadnessar', generalRole: 'En av de tre vännerna',
    bible: `Daniel 3:1-27 - Kung Nebukadnessar lät göra en staty av guld... [Han] kallade samman... alla...
     makthavare i provinserna... När ni hör ljudet av.. alla slags instrument, ska ni falla ner och tillbe
    den gyllene statyn... [Nebukadnessar] "Är det sant att ni Shadrak, Meshak och Abed-Nego, inte... tillber
    den gyllene statyn[?]... Om ni inte tillber ska ni i samma stund kastas i den brinnande ugnen, och vilken
    gud kan då rädda er ur mina händer?" [De tre vännerna] "Om det blir så, är vår Gud... mäktig att rädda oss...
    Men om inte, så ska du veta, o konung, att vi ändå inte... tillber guldstatyn..." Då fylldes Nebukadnessar
    av vrede... så att hans ansiktsuttryck förvandlades. Han befallde att man skulle göra ugnen sju gånger hetare...
    Så bands de... och kastades i den brinnande ugnen... Då blev kun Nebukadnessar förskräckt. Han
    reste sig hastigt och frågade sina rådsherrar: "Var det inte tre män vi band och kastade i elden?...
    Men nu ser jag fyra män gå lösa och lediga inne i elde, helt oskadda. Och den fjärde ser ut som en gudason."...
    Man kunde inte ens känna att de luktade bränt.`,
    authors: `PK 509 From his royal seat the king looked on, expecting to see the
    men who had defied him utterly destroyed. But his feelings of triumph suddenly changed. The nobles standing
    near saw his face grow pale as he started from the throne and looked intently into the glowing flames. `}
  ]};

  private placeGroups: PlaceGroup[] = [this.places1];

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

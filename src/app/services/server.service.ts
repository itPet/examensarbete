import { Place } from './places.service';
import { Injectable } from '@angular/core';
import { AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Player {
  name: string;
  ready: boolean;
  score: number;
  host: boolean;
  role: string;
}

export interface Game {
  id: string;
  started: boolean;
  placeGroupNames: string[];
  chosenPlace: Place;

}

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private playersCollection: AngularFirestoreCollection<Player>;
  private playerDoc: AngularFirestoreDocument<Player>;
  private gameDoc: AngularFirestoreDocument<Game>;

  private rootCollection: AngularFirestoreCollection<Game>;
  private root: Observable<Game[]>;

  private players: Observable<Player[]>;
  private player: Observable<Player>;

  private playerName = ''; // not in firebase
  private gameName: string; // not in firebase
  private host: boolean; // not in firebase

  constructor(private fireDatabase: AngularFirestore) {
  }

  isHost() {
    return this.host;
  }

  getPlayerName() {
    return this.playerName;
  }

  getPlayer() {
    return this.player;
  }

  getPlayerDoc() {
    return this.playerDoc.get();
  }

  // used to update who joins
  getPlayers() {
    return this.players;
  }

  // enables to get playersCollection before this.playersCollection is created
  getPlayersCollection(gameName: string) {
    return this.fireDatabase.collection('root/' + gameName + '/players').get(); // .get() enables to use .toPromise()
  }

  getPlayersCollect() {
    return this.playersCollection.get();
  }

  // used to get chosenPlace and placeGroupNames
  getGameDoc() {
    return this.gameDoc.get(); // .get() enables to use .toPromise()
  }

  getRootCollection() {
    return this.fireDatabase.collection('root').get(); // .get() enables to use .toPromise()
  }

  joinGame(gameName: string, host: boolean) {
    this.gameName = gameName;
    this.host = host;
    // create game document
    this.gameDoc = this.fireDatabase.doc('root/' + gameName);
    if (host) {
      this.gameDoc.set({id : gameName, started : false, placeGroupNames : [], chosenPlace: null});
    }
    // create players collection
    this.playersCollection = this.fireDatabase.collection('root/' + this.gameName + '/players');
    // create one player
    this.playerDoc = this.fireDatabase.doc('root/' + this.gameName + '/players/' + this.playerName);
    this.playerDoc.set({name : this.playerName, ready : false, score : 0, host : host, role : null});
    // listen to changes in players. Use playersCollection so the Player interface can be used
    this.players = this.playersCollection.valueChanges();
    this.player = this.playerDoc.valueChanges();
  }

  setPlayerReadyStatus(status: boolean) {
    this.playerDoc.update({ready : status});
  }

  setPlaceGroupNames(names: string[]) {
    this.gameDoc.update({placeGroupNames : names});
  }

  setGameStartedStatus(status: boolean) {
    this.gameDoc.update({started : status});
  }

  setChosenPlace(place: Place) {
    this.gameDoc.update({chosenPlace : place});
  }

  setPlayerName(name: string) {
    this.playerName = name;
  }

  setPlayerRoles(allPlayers: Player[], uniquePlayer: string, lostPlayer: string, place: Place) {
    allPlayers.forEach(pl => {
    if (pl.name !== uniquePlayer && pl.name !== lostPlayer) {
        this.playersCollection.doc(pl.name).update({role : place.generalRole});
      }
    });
    this.playersCollection.doc(uniquePlayer).update({role : place.uniqueRole});
    this.playersCollection.doc(lostPlayer).update({role : 'lost'});
  }

}

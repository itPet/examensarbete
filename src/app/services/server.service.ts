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
  correctLostGuess: boolean;
  correctUniqueGuess: boolean;
}

export interface Game {
  id: string;
  started: boolean;
  placeGroupNames: string[];
  chosenPlace: Place;
  lostGuessed: boolean;
  lostFound: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private playersCollection: AngularFirestoreCollection<Player>;
  private playerDoc: AngularFirestoreDocument<Player>;
  private gameDoc: AngularFirestoreDocument<Game>;

  private players: Observable<Player[]>;
  private player: Observable<Player>;
  private game: Observable<Game>;

  // private playerName = ''; // not in firebase
  // private gameName: string; // not in firebase

  constructor(private fireDatabase: AngularFirestore) { }

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

  getGame() {
    return this.game;
  }

  getRootCollection() {
    return this.fireDatabase.collection('root').get(); // .get() enables to use .toPromise()
  }

  joinGame(gameName: string, host: boolean, playerName: string) {
    // create game document
    this.gameDoc = this.fireDatabase.doc<Game>('root/' + gameName);
    if (host) {
      this.gameDoc.set({id : gameName, started : null, placeGroupNames : [],
        chosenPlace: null, lostGuessed: null, lostFound : null});
    }
    this.game = this.gameDoc.valueChanges();
    // create players collection
    this.playersCollection = this.fireDatabase.collection<Player>('root/' + gameName + '/players');
    // create one player
    this.playerDoc = this.fireDatabase.doc<Player>('root/' + gameName + '/players/' + playerName);
    this.playerDoc.set({name : playerName, ready : false, score : 0, host : host,
      role : null, correctLostGuess : null, correctUniqueGuess : null});
    // listen to changes in players. Use playersCollection so the Player interface can be used
    this.players = this.playersCollection.valueChanges();
    this.player = this.playerDoc.valueChanges();
  }

  setPlayerReadyStatus(status: boolean) {
    this.playerDoc.update({ready : status});
  }

  setCorrectLostGuess(correct: boolean) {
    this.playerDoc.update({correctLostGuess : correct});
  }

  setCorrectUniqueGuess(correct: boolean) {
    this.playerDoc.update({correctUniqueGuess : correct});
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

  setLostGuessed(guessed: boolean) {
    this.gameDoc.update({lostGuessed : guessed});
  }

  setPlayerRoles(allPlayers: Player[], uniquePlayer: string, lostPlayer: string) {
    allPlayers.forEach(pl => {
    if (pl.name !== uniquePlayer && pl.name !== lostPlayer) {
        this.playersCollection.doc(pl.name).update({role : 'general'});
      }
    });
    this.playersCollection.doc(uniquePlayer).update({role : 'unique'});
    this.playersCollection.doc(lostPlayer).update({role : 'lost'});
  }

}

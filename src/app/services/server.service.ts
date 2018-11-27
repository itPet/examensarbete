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
}

export interface Game {
  id: string;
  started: boolean;
  placeGroupNames: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private playersCollection: AngularFirestoreCollection<Player>;
  private playerDoc: AngularFirestoreDocument<Player>;
  private gameDoc: AngularFirestoreDocument<Game>;
  private gameCollection: AngularFirestoreCollection<Game>;
  private players: Observable<Player[]>;
  private game: Observable<Game>;
  private games: Observable<Game[]>;
  private player = {name : 'undefined', ready : false, score : 0, host : false};
  private playerName = '';

  private gameName: string;

  constructor(private fireDatabase: AngularFirestore) {
    this.gameCollection = fireDatabase.collection('root');
    this.games = this.gameCollection.valueChanges();
  }

  setPlayerName(name: string) {
    this.playerName = name;
  }

  getPlayerName() {
    return this.playerName;
  }

  getPlayerList() {
    return this.players;
  }

  getPlayers(gameName: string) {
    return this.fireDatabase.collection('root/' + gameName + '/players').get(); // .get() enables to use .toPromise()
  }

  getGame() {
    return this.game;
  }

  getCreatedGames() {
    return this.fireDatabase.collection('root').get(); // .get() enables to use .toPromise()
  }

  joinGame(gameName: string, host: boolean) {
    this.gameName = gameName;
    this.player.host = host;
    // create game document
    this.gameDoc = this.fireDatabase.doc('root/' + gameName);
    if (host) {
      this.gameDoc.set({id : gameName, started : false, placeGroupNames : []});
    }
    // create players collection
    this.playersCollection = this.fireDatabase.collection('root/' + this.gameName + '/players');
    // create one player
    this.playerDoc = this.fireDatabase.doc('root/' + this.gameName + '/players/' + this.playerName);
    this.player = {name : this.playerName, ready : false, score : 0, host : this.player.host};
    this.playerDoc.set(this.player);
    // listen to changes in players. Use playersCollection so the Player interface can be used
    this.players = this.playersCollection.valueChanges();
    this.game = this.gameDoc.valueChanges();
  }

  setReadyStatus(status: boolean) {
    this.playerDoc.update({ready : status});
  }

  setPlaceGroupNames(names: string[]) {
    this.gameDoc.update({placeGroupNames : names});
  }

  setGameStartedStatus(status: boolean) {
    this.gameDoc.update({started : status});
  }
}

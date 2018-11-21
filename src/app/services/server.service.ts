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

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private playersCollection: AngularFirestoreCollection<Player>;
  private playerDoc: AngularFirestoreDocument<Player>;
  private players: Observable<Player[]>;
  private player = {name : 'undefined', ready : false, score : 0, host : false};
  private playerName = '';

  private gameName: string;

  constructor(private fireDatabase: AngularFirestore) { }

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
    return this.fireDatabase.collection('root/' + gameName + '/players').get();
  }

  getCreatedGames() {
    return this.fireDatabase.collection('root').get();
  }

  joinGame(gameName: string, host: boolean) {
    this.gameName = gameName;
    this.player.host = host;
    // create game document with id
    this.fireDatabase.doc('root/' + gameName).set({'id' : gameName});
    // create players collection
    this.playersCollection = this.fireDatabase.collection('root/' + this.gameName + '/players');
    // create one player
    this.playerDoc = this.fireDatabase.doc('root/' + this.gameName + '/players/' + this.playerName);
    this.player = {name : this.playerName, ready : false, score : 0, host : this.player.host};
    this.playerDoc.set(this.player);
    // listen to changes in players. Use playersCollection so the Player interface can be used
    this.players = this.playersCollection.valueChanges();
  }

  setReadyStatus(status: boolean) {
    this.playerDoc.update({ready : status});
  }
}

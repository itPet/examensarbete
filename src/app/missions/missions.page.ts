import { LocalGameDataService } from './../services/local-game-data.service';
import { ServerService } from './../services/server.service';
import { Place } from './../services/places.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.page.html',
  styleUrls: ['./missions.page.scss'],
})
export class MissionsPage implements OnInit {

  playerNames: string[];
  playerName: string;
  playerRole: string;
  chosenPlace: Place;
  lGuess: string = null;
  uGuess: string = null;

  constructor(private localData: LocalGameDataService,
    private server: ServerService) { }

  async ngOnInit() {
    this.playerNames = this.localData.getPlayerNames();
    this.playerName = this.localData.getPlayerName();
    this.playerRole = this.localData.getPlayerRole();
    this.chosenPlace = this.localData.getChosenPlace();
  }

  lostGuess(name: string) {
    if (name === null) {
      this.server.setCorrectLostGuess(null);
    } else {
      this.server.setCorrectLostGuess((name === this.localData.getLostPlayer()));
    }
    this.lGuess = name;
    this.localData.setLostGuess(name);
  }

  uniqueGuess(name: string) {
    if (name === null) {
      this.server.setCorrectUniqueGuess(null);
    } else {
      this.server.setCorrectUniqueGuess(name === this.localData.getUniquePlayer());
    }
    this.uGuess = name;
    this.localData.setUniqueGuess(name);
  }
}

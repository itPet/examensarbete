import { Component, OnInit } from '@angular/core';
import { LocalGameDataService } from '../services/local-game-data.service';
import { Place } from '../services/places.service';

@Component({
  selector: 'app-mission-report',
  templateUrl: './mission-report.page.html',
  styleUrls: ['./mission-report.page.scss'],
})
export class MissionReportPage implements OnInit {

  playerRole: string;
  missionOne: string;
  missionOneIcon: string;
  missionOneGuess: string;
  missionOneGuessCorrect: string;
  missionOnePoints: string;
  missionTwo: string;
  missionTwoIcon: string;
  uniqueGuess: string;
  missionTwoGuessCorrect: string;
  missionTwoPoints: string;
  missionTwoFoundBy: string;
  showMissionTwo = false;

  constructor(private localData: LocalGameDataService) { }

  ngOnInit() {
    this.playerRole = this.localData.getPlayerRole();
    this.uniqueGuess = this.localData.getUniqueGuess();
    if (this.uniqueGuess = undefined) {
      this.uniqueGuess = 'Inget';
    }
    let points = 0;
    const chosenPlace = this.localData.getChosenPlace();
    const uniqueGuessCorrect = this.localData.getUniqueGuess() === this.localData.getUniquePlayer();
    const uniquePlayerFound = this.localData.getCorrectUniqueGuesses() > 0;
    const lostGuessCorrect = this.localData.getLostGuess() === this.localData.getLostPlayer();
    const placeGuessCorrect = this.localData.getPlaceGuess() === this.localData.getChosenPlace().name;

    if (this.playerRole !== 'lost') {
      this.missionOne = 'Hitta den vilsne!';
      this.missionOneGuess = this.localData.getLostGuess();
      if (this.missionOneGuess === undefined) {
        this.missionOneGuess = 'Inget';
      }
      if (lostGuessCorrect) {
        this.missionOneIcon = 'checkmark';
        this.missionOneGuessCorrect = 'Rätt';
        this.missionOnePoints = '3 poäng';
      } else {
        this.missionOneIcon = 'close';
        this.missionOneGuessCorrect = 'Fel';
        this.missionOnePoints = '0 poäng';
      }
      if (this.playerRole === 'general') {
        this.missionTwo = 'Hitta ' + chosenPlace.uniqueRole + '!';
        if (uniqueGuessCorrect) {
          this.missionTwoIcon = 'checkmark';
          this.missionTwoGuessCorrect = 'Rätt';
          this.missionTwoPoints = '1 poäng';
        } else {
          this.missionTwoIcon = 'close';
          this.missionTwoGuessCorrect = 'Fel';
          this.missionTwoPoints = '0 poäng';
        }
      } else if (this.playerRole === 'unique') {
        this.missionTwo = 'Bli hittad av minst en annan!';
        this.missionTwoFoundBy = this.localData.getCorrectUniqueGuesses() + ' pers';
        this.showMissionTwo = true;
        if (uniquePlayerFound) {
          this.missionTwoIcon = 'checkmark';
          this.missionTwoGuessCorrect = 'Bra';
          this.missionTwoPoints = '1 poäng';
        } else {
          this.missionTwoIcon = 'close';
          this.missionTwoGuessCorrect = 'Dåligt';
          this.missionTwoPoints = '0 poäng';
        }
      }
    }

    if (this.playerRole === 'lost') {
      this.missionOne = 'Hitta rätt plats!';
      this.missionOneGuess = this.localData.getPlaceGuess();
      if (this.localData.getPlaceGuess() === undefined) {
        this.missionOneGuess = 'Inget';
      }
      if (placeGuessCorrect) {
        this.missionOneIcon = 'checkmark';
        this.missionOneGuessCorrect = 'Rätt';
        this.missionOnePoints = '3 poäng';
        this.showMissionTwo = true;
      } else {
        this.missionOneIcon = 'close';
        this.missionOneGuessCorrect = 'Fel';
        this.missionOnePoints = '0 poäng';
      }

      this.missionTwo = 'Bli inte hittad av majoriteten!';
      this.missionTwoFoundBy = this.localData.getCorrectLostGuesses() + ' pers';
      if (this.localData.getLostPlayerFound) {
        this.missionTwoIcon = 'close';
        this.missionTwoGuessCorrect = 'Dåligt';
        this.missionTwoPoints = '0 poäng';
      } else {
        this.missionTwoIcon = 'checkmark';
        this.missionTwoGuessCorrect = 'Bra';
        this.missionTwoPoints = '1 poäng';
      }
    }

    if (uniqueGuessCorrect) {
      points += 1;
    }
    if (lostGuessCorrect) {
      points += 3;
    }
    if (placeGuessCorrect) {
      points += 3;
    }
    if (!this.localData.getLostPlayerFound()) {
      points += 1;
    }

    this.localData.addPoints(points);
  }

  resetData() {

  }

}

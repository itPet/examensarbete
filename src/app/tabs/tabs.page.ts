import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServerService} from '../services/server.service';
import { LocalGameDataService } from '../services/local-game-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  minutes = 10;
  seconds = 10;
  zeroS: number = null;
  zeroM: number = null;
  subscription: Subscription;
  subscriptionTwo: Subscription;
  allP: number;

  constructor(public alertCtrl: AlertController,
    private router: Router,
    private server: ServerService,
    private localData: LocalGameDataService) { }

  ngOnInit() {
    this.timer();
    this.subscription = this.server.getGame().subscribe(game => {
      if (game.lostGuessed) {
        this.localData.setLostGuessed(true);
        this.subscriptionTwo.unsubscribe();
        this.storeCorrectUniqueAndLostGuesses();
        this.router.navigateByUrl('/round-finished');
      }
    });

    this.allP = this.localData.getPlayerNames().length - 1;

    this.subscriptionTwo = this.server.getPlayers().subscribe(res => {
      let rightGuesses = 0;
      let allHaveGuessed = true;
      res.forEach(player => {
        if (player.role !== 'lost' && player.correctLostGuess === null) {
          allHaveGuessed = false;
        }
        if (player.role === 'general' && player.correctUniqueGuess === null) {
          allHaveGuessed = false;
        }
        if (player.correctLostGuess) {
          rightGuesses ++;
        }
      });
      console.log('rightGuesses: ' + rightGuesses);
      console.log('division: ' + (rightGuesses / this.allP));
      console.log('allHaveGuessed: ' + allHaveGuessed);
      if (allHaveGuessed && (rightGuesses / this.allP) > 0.5) {
        console.log('you made it here');
        this.localData.setLostPlayerFound(true);
        let correctGuesses = 0;
        let correctLost = 0;
        res.forEach(pl => {
          if (pl.correctUniqueGuess) {
            correctGuesses ++;
          }
          if (pl.correctLostGuess) {
            correctLost ++;
          }
        });
        this.localData.setCorrectLostGuesses(correctLost);
        this.localData.setCorrectUniqueGuesses(correctGuesses);
        this.router.navigateByUrl('/round-finished');
      }
    });
  }

  ionViewWillLeave() {
    console.log('willLeave tabs page');
    this.subscription.unsubscribe();
    this.subscriptionTwo.unsubscribe();
  }

  timer() {
    const intervalId = setInterval(() => {
      this.seconds -= 1;
      if (this.seconds <= 0 && this.minutes > 0) {
        this.minutes -= 1;
        this.seconds = 59;
      }
      if (this.seconds < 10) {
        this.zeroS = 0;
      } else {
        this.zeroS = null;
      }
      if (this.minutes < 10) {
        this.zeroM = 0;
      } else {
        this.zeroM = null;
      }
      if (this.minutes <= 0 && this.seconds <= 0) {
        clearInterval(intervalId);
        this.localData.setTimeRanOut(true);
        this.subscriptionTwo.unsubscribe();
        this.storeCorrectUniqueAndLostGuesses();
        this.router.navigateByUrl('/round-finished');
      }
    }, 1000);
  }

  storeCorrectUniqueAndLostGuesses() {
    let correctGuesses = 0;
    let correctLost = 0;
    this.subscriptionTwo = this.server.getPlayers().subscribe(res => {
      correctGuesses = 0;
      correctLost = 0;
      res.forEach(p => {
        if (p.correctUniqueGuess) {
          correctGuesses ++;
        }
        if (p.correctLostGuess) {
          correctLost ++;
        }
      });
    });

    this.localData.setCorrectLostGuesses(correctLost);
    this.localData.setCorrectUniqueGuesses(correctGuesses);
  }

}

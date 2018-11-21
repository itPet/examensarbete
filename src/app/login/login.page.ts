import { ServerService, Player } from './../services/server.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { exists } from 'fs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  playerName: string;
  buttonDisabled = true;
  storedName: boolean;
  loader: any;
  players: any;


  constructor(private router: Router,
    private server: ServerService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    if (this.server.getPlayerName() === '') {
      this.storedName = false;
    } else {
      this.storedName = true;
    }
  }

  nameTyped(name) {
    const value: string = name.detail.value;
    if (value.length > 2) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }

  storePlayerName() {
    this.server.storePlayerName(this.playerName);
    this.storedName = true;
  }

  createGame() {
    this.createAndJoinAlert('Skapa ett spel!', 'Ange spelets namn!', true);
  }

  joinGame() {
    this.createAndJoinAlert('Gå med i ett spel!', 'Ange spelets namn!', false);
  }

  async createAndJoinAlert(header: string, message: string, creator: boolean) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      inputs: [{
        name: 'gameName',
        type: 'text',
        placeholder: 'Spelnamn'
      }],
      buttons: [
        {
          text: 'Avbryt',
          role: 'cancel'
        },
        {
          text: 'Klart',
          handler: async (inputs) => {
            const gameNameMsg = await this.validateGameName(inputs.gameName, creator);
            if (gameNameMsg === 'valid') {
              if (creator) {
                this.server.joinGame(inputs.gameName, true);
                this.router.navigateByUrl('/score');
              } else {
                const playerNameMsg = await this.validatePlayerName(this.playerName, inputs.gameName);
                if (playerNameMsg === 'valid') {
                  this.server.joinGame(inputs.gameName, false);
                  this.router.navigateByUrl('/score');
                } else {
                  this.changeNameAlert('Byt namn!', playerNameMsg, inputs.gameName);
                }
              }
            } else {
              if (creator) {
                this.createAndJoinAlert('Skapa ett spel!', gameNameMsg, creator);
              } else {
                this.createAndJoinAlert('Gå med i spel!', gameNameMsg, creator);
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async changeNameAlert(header: string, message: string, gameName: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      inputs: [
        {
          name: 'playerName',
          type: 'text',
          placeholder: 'Nytt namn'
        }
      ],
      buttons: [{
          text: 'Avbryt',
          role: 'cancel',
          handler: () => {
            this.changeNameAlert(header, message, gameName);
          }
        }, {
          text: 'Klar',
          handler: async (inputs) => {
            const playerNameMsg = await this.validatePlayerName(inputs.playerName, gameName);
            if (playerNameMsg === 'valid') {
              this.server.storePlayerName(inputs.playerName);
              this.server.joinGame(gameName, false);
              this.router.navigateByUrl('/score');
            } else {
              this.changeNameAlert(header, playerNameMsg, gameName);
            }
          }
        }
      ]
    });
    alert.present();
  }

  async validatePlayerName(playerName: string, gameName: string): Promise<string> {
    if (playerName.length < 3) {
      return '"' + playerName + '" är för kort. Ditt namn måste vara minst 3 bokstäver. Försök igen!';
    } else {
      this.loader = await this.presentLoader();
      const playersCollection = await this.server.getPlayers(gameName).toPromise();
      let validName = true;
      playersCollection.forEach(doc => {
        if (doc.id === playerName) {
          validName = false;
        }
      });
      this.loader.dismiss();
      if (validName) {
        return 'valid';
      } else {
        return '"' + playerName + '" är redan upptaget av en annan spelare. Välj ett annat namn!';
      }
    }
  }

  async validateGameName(gameName: string, gameCreator: boolean): Promise<string> {
    if (gameName.length < 3) {
      return '"' + gameName + '" är för kort. Skriv ett spelnamn med minst 3 bokstäver!';
    } else {
      this.loader = await this.presentLoader();
      const rootCollection = await this.server.getCreatedGames().toPromise();
      let validName = gameCreator;
      rootCollection.forEach(doc => {
        if (gameName === doc.id) {
          validName = !gameCreator;
        }
      });
      this.loader.dismiss();
      if (validName) {
        return 'valid';
      } else {
        if (gameCreator) {
          return '"' + gameName + '" finns redan. Välj ett annat spelnamn!';
        } else {
          return '"' + gameName + '" finns inte. Välj ett annat spelnamn!';
        }
      }
    }
  }

  async presentLoader() {
    const loading = await this.loadingCtrl.create({
      message: 'Laddar...'
    });
    loading.present();
    return loading;
  }

}

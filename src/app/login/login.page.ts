import { Storage } from '@ionic/storage';
import { ServerService } from './../services/server.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

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

  constructor(private router: Router,
    private server: ServerService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private ngZone: NgZone) { }

  async ngOnInit() {
    this.storage.get('name').then(res => {
      if (res != null) {
        this.playerName = res;
        this.storedName = true;
        this.server.setPlayerName(res);
      } else {
        this.storedName = false;
      }
    });
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
    this.storedName = true;
    this.storage.set('name', this.playerName);
    this.server.setPlayerName(this.playerName);
  }

  createGame() {
    this.createAndJoinAlert('Skapa ett spel!', 'Ange spelets namn!', true);
  }

  joinGame() {
    this.createAndJoinAlert('Gå med i ett spel!', 'Ange spelets namn!', false);
  }

  changeName() {
    this.storedName = false;
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
                this.ngZone.run(() => {
                  this.router.navigateByUrl('/createGame');
                });
              } else {
                const playerNameMsg = await this.validatePlayerName(this.playerName, inputs.gameName);
                if (playerNameMsg === 'valid') {
                  this.server.joinGame(inputs.gameName, false);
                  this.ngZone.run(() => {
                    this.router.navigateByUrl('/score');
                  });
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
              this.server.setPlayerName(inputs.playerName);
              this.storage.set('name', inputs.playerName);
              this.server.joinGame(gameName, false);
              this.ngZone.run(() => {
                this.router.navigateByUrl('/score');
              });
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
      const playersCollection = await this.server.getPlayersCollection(gameName).toPromise();
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
      const rootCollection = await this.server.getRootCollection().toPromise();
      let validName = gameCreator;
      rootCollection.forEach(doc => {
        if (gameName === doc.id) {
          validName = !gameCreator;
          if (!gameCreator && doc.data().started) {
            validName = null;
          }
        }
      });
      this.loader.dismiss();
      if (validName) {
        return 'valid';
      } else if (validName === null) {
        return '"' + gameName + '" har redan börjat utan dig. Välj ett annat spelnamn!';
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

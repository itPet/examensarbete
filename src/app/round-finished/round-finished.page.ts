import { Component, OnInit } from '@angular/core';
import { LocalGameDataService } from '../services/local-game-data.service';

@Component({
  selector: 'app-round-finished',
  templateUrl: './round-finished.page.html',
  styleUrls: ['./round-finished.page.scss'],
})
export class RoundFinishedPage implements OnInit {

  titleMsg: string;
  contentMsg: string;

  constructor(private localData: LocalGameDataService) { }

  ngOnInit() {
    if (this.localData.getLostGuessed()) {
      if (this.localData.getPlayerRole() === 'lost') {
        this.titleMsg = 'du har hittat en plats!';
        this.contentMsg = 'Berätta för de andra att du var vilsen men nu har hittat en plats och ' +
        'vilken plats det är du har hittat.';
      } else {
        this.titleMsg = 'den vilsne har hittat en plats!';
        this.contentMsg = 'Lyssna medan den vilsne talar om vilken plats den har kommit fram till.';
      }
    } else if (this.localData.getTimeRanOut()) {
      this.titleMsg = 'tiden tog slut!';
      this.contentMsg = 'Du kan berätta för de andra vilken roll du hade.';
    } else if (this.localData.getLostPlayerFound()) {
      this.titleMsg = 'majoriteten lyckades hitta den vilsne!';
      this.contentMsg = 'Du kan berätta för de andra vilken roll du hade.';
    }
  }

}

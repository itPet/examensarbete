import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.page.html',
  styleUrls: ['./create-game.page.scss'],
})
export class CreateGamePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  continueBtnClicked() {
    this.router.navigateByUrl('/score');
  }

}

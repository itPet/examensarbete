import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RoundFinishedPage } from './round-finished.page';

const routes: Routes = [
  {
    path: '',
    component: RoundFinishedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RoundFinishedPage]
})
export class RoundFinishedPageModule {}

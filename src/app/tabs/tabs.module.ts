import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { PlacesPageModule } from '../places/places.module';
import { MissionsPageModule } from './../missions/missions.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    MissionsPageModule,
    PlacesPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { PlacesPage } from './../places/places.page';
import { MissionsPage } from './../missions/missions.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/game-play/tabs/(places:places)',
        pathMatch: 'full',
      },
      {
        path: 'places',
        outlet: 'places',
        component: PlacesPage
      },
      {
        path: 'missions',
        outlet: 'missions',
        component: MissionsPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/game-play/tabs/(places:places)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

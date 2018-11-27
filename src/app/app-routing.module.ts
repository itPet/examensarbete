import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'game-play', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'score', loadChildren: './score/score.module#ScorePageModule' },
  { path: 'createGame', loadChildren: './create-game/create-game.module#CreateGamePageModule' },
  { path: 'place-details/:name', loadChildren: './place-details/place-details.module#PlaceDetailsPageModule' },
  { path: 'places', loadChildren: './places/places.module#PlacesPageModule' },
  { path: 'missions', loadChildren: './missions/missions.module#MissionsPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

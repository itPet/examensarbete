import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'game-play', loadChildren: './tabs/tabs.module#TabsPageModule' },
  // { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'score', loadChildren: './score/score.module#ScorePageModule' },
  { path: 'createGame', loadChildren: './create-game/create-game.module#CreateGamePageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

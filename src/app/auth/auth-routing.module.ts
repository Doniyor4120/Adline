import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthComponent} from './auth.component';
import {ResetComponent} from './reset/reset.component';
import {FinishComponent} from './finish/finish.component';

const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'reset/init', component: ResetComponent},
  {path: 'reset/finish', component: FinishComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GuardService} from '../services/guard.service';
import {HomeComponent} from './routes/home/home.component';
import {GroupAdsComponent} from './routes/group-ads/group-ads.component';
import {CampaignsComponent} from './routes/campaigns/campaigns.component';
import {PlatformsComponent} from './routes/platforms/platforms.component';
import {AdsComponent} from './routes/ads/ads.component';
import {GroupAdsChildComponent} from './routes/group-ads-child/group-ads-child.component';
import {AdsChildComponent} from './routes/ads-child/ads-child.component';
import {DownloadComponent} from './routes/download/download.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [GuardService]},
  {path: 'group-ads/:id', component: GroupAdsChildComponent, canActivate: [GuardService]},
  {path: 'group-ads', component: GroupAdsComponent, canActivate: [GuardService]},
  {path: 'campaigns', component: CampaignsComponent, canActivate: [GuardService]},
  {path: 'platforms', component: PlatformsComponent, canActivate: [GuardService]},
  {path: 'ads/:id', component: AdsChildComponent, canActivate: [GuardService]},
  {path: 'ads', component: AdsComponent, canActivate: [GuardService]},
  {path: 'download', component: DownloadComponent, canActivate: [GuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule {
}

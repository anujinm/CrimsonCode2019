import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {SearchResultComponent} from './search-result/search-result.component';
import {AuthGuard} from './auth/auth.guard';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchResultComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

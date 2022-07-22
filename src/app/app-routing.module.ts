import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import {MyProfileComponent} from "./components/my-profile/my-profile.component";

const routes: Routes = [
  {path : 'home' , component : HomeComponent},
  {path: '' , redirectTo: '/home', pathMatch: 'full'},
  {path: 'myProfile' , component: MyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

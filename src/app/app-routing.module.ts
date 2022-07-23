import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {MyProfileComponent} from "./components/my-profile/my-profile.component";
import {AdminComponent} from "./components/admin/admin.component";

const routes: Routes = [
  {path: 'admin', component: AdminComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile/:master_id',component: MyProfileComponent },
  {path: 'profile', component: MyProfileComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

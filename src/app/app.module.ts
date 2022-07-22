import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './components/navbar/navbar.component';
import { MastersComponent } from './components/masters/masters.component';
import { MasterCardComponent } from './components/master-card/master-card.component';
import { HomeComponent } from './components/home/home.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BookingsTableComponent} from "./components/bookings-table/bookings-table.component";
import {ClientProfileComponent} from "./components/client-profile/client-profile.component";
import {MyProfileComponent} from "./components/my-profile/my-profile.component";
import {MasterProfileComponent} from "./components/master-profile/master-profile.component";
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MastersComponent,
    MasterCardComponent,
    HomeComponent,
    BookingsTableComponent,
    ClientProfileComponent,
    MyProfileComponent,
    MasterProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

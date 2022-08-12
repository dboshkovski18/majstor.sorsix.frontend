import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './components/navbar/navbar.component';
import { MastersComponent } from './components/masters/masters.component';
import { MasterCardComponent } from './components/master-card/master-card.component';
import { HomeComponent } from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BookingsTableComponent} from "./components/bookings-table/bookings-table.component";
import {ClientProfileComponent} from "./components/client-profile/client-profile.component";
import {MyProfileComponent} from "./components/my-profile/my-profile.component";
import {MasterProfileComponent} from "./components/master-profile/master-profile.component";
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './components/admin/admin.component'
import {NgxPaginationModule} from 'ngx-pagination';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component'

import {authInterceptorProviders} from './AuthInterceptor';
import { ClientBookingTableComponent } from './components/client-booking-table/client-booking-table.component';
import {NgbModule, NgbPopoverModule} from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import { MasterEditComponent } from './components/master-edit/master-edit.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {ClientEditComponent} from "./components/client-edit/client-edit.component";

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
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    ClientBookingTableComponent,
    MasterEditComponent,
    ClientEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    NgxPaginationModule,
    NgbPopoverModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

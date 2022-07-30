import { Component, OnInit } from '@angular/core';
import {Booking} from "../../interfaces/Booking";
import {BehaviorSubject, debounceTime, flatMap, Observable} from "rxjs";
import {BookingService} from "../../services/booking.service";
import {User} from "../../interfaces/User";
import {Token} from "@angular/compiler";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-client-booking-table',
  templateUrl: './client-booking-table.component.html',
  styleUrls: ['./client-booking-table.component.css']
})
export class ClientBookingTableComponent implements OnInit {

  bookings$! : Observable<Booking[]>

  user!  : User

  subject$ = new BehaviorSubject<boolean>(true)

  constructor(private bookingService: BookingService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {

    this.user = this.tokenService.getUser()

    this.getBookingsByClient()
  }

  getBookingsByClient(){
    this.bookings$ = this.subject$.pipe(
      debounceTime(200),
      flatMap(_ => this.bookingService.getBookingsByClient(this.user!.client.id))
    )
  }

  deleteBooking(id : number){
    this.bookingService.deleteBookingById(id);
    this.subject$.next(true)
  }



}

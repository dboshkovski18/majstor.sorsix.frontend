import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, debounceTime, Observable, switchMap} from "rxjs";
import {Booking} from "../../interfaces/Booking";
import {BookingService} from "../../services/booking.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import { User } from 'src/app/interfaces/User';
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css']
})
export class BookingsTableComponent implements OnInit {

  master_id! : number

  client_id! : number

  user! : User

  bookForm! : FormGroup

  subject$ = new BehaviorSubject<boolean>(true)

  bookings$! : Observable<Booking[]>

  constructor(private bookingService : BookingService,private route: ActivatedRoute, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser()

    this.getBookingsByMaster()

    if(!this.route.snapshot.paramMap.get("master_id")){
      this.master_id = this.user.master.id
    }else {
      this.master_id = Number(this.route.snapshot.paramMap.get("master_id"))
    }

    this.bookForm = new FormGroup({
      date: new FormControl(Date.now())
    })
  }

  getBookingsByMaster() : void {
    this.bookings$ = this.subject$.pipe(debounceTime(100),
      switchMap(_ => this.bookingService.getBookingsByMaster(this.master_id!)))
  }


  deleteBookingByMaster(bookingId : number) : void {
    this.bookingService.deleteBookingById(bookingId);
    this.subject$.next(true)
  }

  book(){
    console.log("booked")
    this.bookingService.createABooking(new Date(this.bookForm.value.date!),this.master_id,this.user!.client.id)
    this.subject$.next(true)
  }
}

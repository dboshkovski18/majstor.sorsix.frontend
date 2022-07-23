import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, debounceTime, Observable, switchMap} from "rxjs";
import {Booking} from "../../interfaces/Booking";
import {BookingService} from "../../services/booking.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css']
})
export class BookingsTableComponent implements OnInit {

  @Input() master_name: string | undefined
  @Input() master_id: number | undefined

  bookForm = new FormGroup({
    date: new FormControl(Date.now())
  })

  subject$ = new BehaviorSubject<boolean>(true)

  bookings$! : Observable<Booking[]>

  constructor(private bookingService : BookingService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.getBookingsByMaster()

  }

  getBookingsByMaster() : void {
    this.bookings$ = this.subject$.pipe(debounceTime(200),
      switchMap(_ => this.bookingService.getBookingsByMaster(this.master_id!)))
  }

  deleteBookingByMaster(bookingId : number) : void {
    this.bookingService.deleteBookingById(bookingId);
    this.subject$.next(true)
  }

  book(){
    this.bookingService.createABooking(new Date(this.bookForm.value.date!),Number(this.route.snapshot.paramMap.get('master_id')),2)
    this.subject$.next(true)
  }
}

import {Component, OnInit} from '@angular/core';
import {MasterService} from "../../services/master.service";
import {Master} from "../../interfaces/Master";
import {BehaviorSubject, debounceTime, Observable, share, startWith, Subject, switchMap, tap} from "rxjs";
import {CitiesService} from "../../services/cities.service";
import {City} from "../../interfaces/City";
import {BookingService} from "../../services/booking.service";
import {Booking} from "../../interfaces/Booking";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  masters$!: Observable<Array<Master>>
  subject$ = new BehaviorSubject<boolean>(true)
  bookings$! : Observable<Array<Booking>>

  constructor(private masterService: MasterService, private cityService: CitiesService,private bookingService: BookingService) {
  }

  ngOnInit(): void {
    this.masters$ = this.subject$.pipe(
      debounceTime(200),
      switchMap(_ => this.masterService.getMasters())
    )

    this.bookings$ = this.subject$.pipe(
      debounceTime(200),
      switchMap(_ => this.bookingService.getBookings())
    )


  }

  approveMaster(id: number) {
    this.masterService.approveMaster(id)
    this.subject$.next(false)
  }

  disapproveMaster(id: number) {
    this.masterService.disapproveMaster(id)
    this.subject$.next(false)
  }

  getCitiesByMaster(id: number): City[] {
    console.log("test")
    let cities: City[] = []
    this.cityService.getCitiesByMaster(id).subscribe(data => {
      cities = data
      }
    )

    return cities

  }

}

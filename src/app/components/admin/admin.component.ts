import {Component, OnInit} from '@angular/core';
import {MasterService} from "../../services/master.service";
import {Master} from "../../interfaces/Master";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  share,
  startWith,
  Subject,
  Subscription,
  switchMap,
  tap
} from "rxjs";
import {CitiesService} from "../../services/cities.service";
import {City} from "../../interfaces/City";
import {BookingService} from "../../services/booking.service";
import {Booking} from "../../interfaces/Booking";
import {FormControl, FormGroup} from "@angular/forms";
import {query} from "@angular/animations";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  masters$!: Observable<Array<Master>>
  masters!: Array<Master>
  subject$ = new BehaviorSubject<boolean>(true)
  bookings$! : Observable<Array<Booking>>
  bookings!: Array<Booking>

  searchSubject$ = new BehaviorSubject<string>('')

  searchForm!: FormGroup

  masters_page = 1
  bookings_page = 1

  constructor(private masterService: MasterService, private cityService: CitiesService,private bookingService: BookingService) {
  }

  ngOnInit(): void {
    this.masters$ = this.subject$.pipe(
      debounceTime(200),
      switchMap(_ => this.masterService.getMasters())
    )

    this.masters$.subscribe((data) => {
      this.masters = data
    })

    this.masters$ = this.searchSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.masterService.searchMastersByName(term))
    )

    this.masters$.subscribe((data) => {
      this.masters = data
    })

    this.bookings$ = this.subject$.pipe(
      debounceTime(200),
      switchMap(_ => this.bookingService.getBookings())
    )

    this.bookings$.subscribe((data) => {
      this.bookings = data
    })

    this.searchForm = new FormGroup({
      query: new FormControl('')
    })

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

  search(term : string){
    console.log(this.searchForm.value.query)
    this.searchSubject$.next(term)
  }

}

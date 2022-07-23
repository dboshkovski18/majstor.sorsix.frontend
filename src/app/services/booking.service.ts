import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking} from "../interfaces/Booking";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {
  }

  url = "http://localhost:8080/api/bookings"

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.url)
  }

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(this.url.concat(`/${id}`))
  }

  getBookingsByMaster(masterId : number) : Observable<Booking[]> {
    return this.http.get<Booking[]>(this.url.concat(`/forMaster/${masterId}`))
  }

  deleteBookingById(bookingId : number) : void {
    this.http.delete(this.url.concat(`/delete/${bookingId}`)).subscribe()
  }

}

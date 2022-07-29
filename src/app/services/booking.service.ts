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

  url = "api/bookings"

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.url)
  }

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(this.url.concat(`/${id}`))
  }

  getBookingsByMaster(masterId : number) : Observable<Booking[]> {
    return this.http.get<Booking[]>(this.url.concat(`/forMaster/${masterId}`))
  }


  getBookingsByClient(clientId : number) : Observable<Booking[]> {
    return this.http.get<Booking[]>(this.url.concat(`/forClient/${clientId}`))
  }

  deleteBookingById(bookingId : number) : void {
    this.http.delete(this.url.concat(`/delete/${bookingId}`)).subscribe()
  }

  createABooking(date: Date, master_id: number, client_id: number) : void {
    this.http.post(this.url.concat('/add'),{
      date: date,
      master_id: master_id,
      client_id: client_id
    }).subscribe()
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {City} from "../interfaces/City";

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http : HttpClient) { }

  url = 'http://localhost:8080/api/cities'

  getCities() : Observable<City[]> {
    return this.http.get<City[]>(this.url).pipe(
      tap(data => console.log(data))
    )
  }
}

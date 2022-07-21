import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Master} from "../interfaces/Master";

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) {
  }

  url = 'http://localhost:8080/api/masters'

  getMasters(): Observable<Master[]> {
    return this.http.get<Master[]>(this.url)
  }

  getMasterTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.url.concat('/types'))
  }

}

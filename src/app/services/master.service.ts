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

  getApprovedMasters(): Observable<Master[]>{
    return this.http.get<Master[]>(this.url.concat('/approved'))
  }

  getMasterTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.url.concat('/types'))
  }

  filterMasters(city_id: number, master_type: string): Observable<Master[]> {
    return this.http.get<Master[]>(this.url.concat("/filter"), {
      params: {
        city_id: city_id,
        master_type: master_type
      }
    })
  }

  getMasterById(id: Number): Observable<Master> {
    return this.http.get<Master>(this.url.concat(`/${id}`))
  }

  editMaster(id: Number, name: string, surname: string, phone_number: string, email: string, embg: string, gender: string, type: string) : void{
    console.log(id)
     this.http.put(this.url.concat(`/edit/${id}`), {
      name:name,
      surname:surname,
      phone_number:phone_number,
      embg:embg,
      gender:gender,
      type:type,
      city: 1,
      email : email
    }).subscribe(data => {
      tap(data)
     })
  }

  approveMaster(id: number): void {
    this.http.get(this.url.concat(`/approve/${id}`)).subscribe(data => {
      tap(data)
    })

  }


  disapproveMaster(id: number): void {
    this.http.get(this.url.concat(`/disapprove/${id}`)).subscribe(data => {
      tap(data)
    })

  }

  getRecommendations(id: number): Observable<number>{
    return this.http.get<number>(this.url.concat(`/recommendations/${id}`))
  }



}

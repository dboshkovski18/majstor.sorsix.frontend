import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Client} from "../interfaces/Client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http : HttpClient) { }

  url = "api/clients"

  getClients() : Observable<Client[]> {
    return this.http.get<Client[]>(this.url)
  }

  getClientById(id: number) : Observable<Client>{
    return this.http.get<Client>(this.url.concat(`/${id}`))
  }

  recommendMaster(recommendation: string = 'RECOMMENDED',client : number, master: number): void{
    this.http.post(this.url.concat('/rate'),{
      recommendation: recommendation,
      client: client,
      master: master
    }).subscribe()
  }

  checkIfMasterRatedByUser(client_id: number, master_id: number): Observable<boolean>{
    console.log("client service called!")
      return this.http.get<boolean>(this.url.concat(`/${client_id}/rated/${master_id}`))
  }

  editClient(id: number, name: string, surname: string, phone_number: string, email: string, gender: string,address: string): void {
    this.http.put(this.url.concat(`/edit/${id}`), {
      name: name,
      surname: surname,
      phone_number: phone_number,
      address: address,
      gender: gender,
      email: email
    }).subscribe(data => {
      tap(data)
    })
  }
}

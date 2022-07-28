import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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

}

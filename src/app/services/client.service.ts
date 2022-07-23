import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../interfaces/Client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http : HttpClient) { }

  url = "http://localhost:8080/api/clients"

  getClients() : Observable<Client[]> {
    return this.http.get<Client[]>(this.url)
  }

  getClientById(id: number) : Observable<Client>{
    return this.http.get<Client>(this.url.concat(`/${id}`))
  }

}

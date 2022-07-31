import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interfaces/User";
import {LogInResponse} from "../interfaces/LogInResponse";
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) {
  }

  logIn(username: string, password: string) : Observable<LogInResponse> {
    return this.http.post<LogInResponse>("/login", {
      "username" : username,
      "password" : password
    })
  }

  registerMaster(form: any): void{
    this.http.post<any>("/registerMaster",{
      username: form.username,
      password: form.password,
      role: form.role,
      name: form.name,
      surname: form.surname,
      phone_number: ('0').concat(form.phone_number),
      embg: form.embg,
      gender: form.gender,
      type: form.type,
      city: form.city,
      email: form.email,
    }).subscribe()
  }


  registerClient(form: any): void{
    this.http.post<any>("/registerClient",{
      username: form.username,
      password: form.password,
      role: form.role,
      name: form.name,
      surname: form.surname,
      phone_number: ('0').concat(form.phone_number),
      gender: form.gender,
      address: form.address,
      email: form.email,
    }).subscribe()
  }
}

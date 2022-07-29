import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interfaces/User";
import {LogInResponse} from "../interfaces/LogInResponse";

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
}

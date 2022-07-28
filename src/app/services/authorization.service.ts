import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) {
  }

  getJWTToken(username: string, password: string) : Observable<string> {
    return this.http.post<string>("/login", {
      "username" : username,
      "password" : password
    })
  }
}

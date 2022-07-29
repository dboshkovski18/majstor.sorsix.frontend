import {Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MasterService} from "./services/master.service";
import {Token} from "@angular/compiler";
import {TokenStorageService} from "./services/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private role: string | undefined;

  isLoggedIn = false;
  username: string | undefined;

  constructor(private tokenStorageService: TokenStorageService) {
  }

  title = "majstor.mk"
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken()

    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.role = user.role

      this.username = user.username
    }
  }






}

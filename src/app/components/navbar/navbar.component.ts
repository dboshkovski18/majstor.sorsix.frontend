import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {User} from "../../interfaces/User";



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  isAdminLogged = false;
  isMasterLogged = false;
  isUserLogged = false;

  username: string | undefined

  user : User | undefined

  constructor(private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenService.getUser().role == "ROLE_ADMIN"){
      this.isAdminLogged = true
    }

    if(this.tokenService.getUser()){
      this.isLoggedIn = true
    }

    this.user = this.tokenService.getUser()
  }

  logout(){
    this.isLoggedIn = false
    this.tokenService.signOut()
    window.location.reload()
  }



}

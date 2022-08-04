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
  isClientLogged = false;
  user! : User

  constructor(private tokenService: TokenStorageService) { }

  ngOnInit(): void {

    this.user = this.tokenService.getUser()

    if(this.user.role == "ROLE_ADMIN"){
      this.isAdminLogged = true
    }
    if(this.user.role == "ROLE_CLIENT"){
      this.isClientLogged = true
    }
    if(this.user.role == "ROLE_MASTER"){
      this.isMasterLogged = true
    }

    if(this.user){
      this.isLoggedIn = true
    }
  }

  logout(){
    this.isLoggedIn = false
    this.tokenService.signOut()
    window.location.reload()
  }



}

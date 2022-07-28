import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthorizationService} from "../../services/authorization.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
  })

  constructor(private authService : AuthorizationService) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginForm.value.username)
    this.authService.getJWTToken(this.loginForm.value.username! , this.loginForm.value.password!)
      .subscribe(data => console.log(data))
  }

}

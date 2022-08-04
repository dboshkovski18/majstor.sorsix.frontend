import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthorizationService} from "../../services/authorization.service";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error : boolean = false;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authService: AuthorizationService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {

  }

  login() {
    this.authService.logIn(this.loginForm.value.username!, this.loginForm.value.password!).subscribe(
      res => {
        this.tokenStorage.saveToken(res.access_token);
        this.tokenStorage.saveUser(res.user);
        window.location.reload()
      },
      err => this.error = true,
    )
  }

}

import {Component, OnInit} from '@angular/core';
import {City} from "../../interfaces/City";
import {CitiesService} from "../../services/cities.service";
import {Master} from "../../interfaces/Master";
import {MasterService} from "../../services/master.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthorizationService} from "../../services/authorization.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {debounceTime, flatMap, tap} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  cities!: Array<City>
  types!: Array<string>

  constructor(private tokenStorage: TokenStorageService,private cityService: CitiesService, private masterService: MasterService, private authService: AuthorizationService) {
  }

  registerMasterForm!: FormGroup
  registerClientForm!: FormGroup

  ngOnInit(): void {
    this.cityService.getCities().subscribe((data) => {
        this.cities = data
      }
    )
    this.masterService.getMasterTypes().subscribe((data) => {
      this.types = data
    })


    this.registerMasterForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl('ROLE_MASTER'),
      name: new FormControl(''),
      surname: new FormControl(''),
      phone_number: new FormControl(''),
      embg: new FormControl(''),
      gender: new FormControl('male'),
      type: new FormControl('Electrician'),
      city: new FormControl(1),
      email: new FormControl(''),
    })

    this.registerClientForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl('ROLE_CLIENT'),
      name: new FormControl(''),
      surname: new FormControl(''),
      phone_number: new FormControl(''),
      gender: new FormControl('male'),
      address: new FormControl(''),
      email: new FormControl(''),
    })
  }

  registerMaster() {
    console.log(this.registerMasterForm.value)
    this.authService.registerMaster(this.registerMasterForm.value)
    window.location.reload()
  }

  registerClient() {
    console.log(this.registerClientForm.value)
    this.authService.registerClient(this.registerClientForm.value)
    window.location.reload()
  }

}

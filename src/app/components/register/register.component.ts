import {Component, OnInit} from '@angular/core';
import {City} from "../../interfaces/City";
import {CitiesService} from "../../services/cities.service";
import {MasterService} from "../../services/master.service";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {AuthorizationService} from "../../services/authorization.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {group} from "@angular/animations";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  cities!: Array<City>
  types!: Array<string>

  registerMasterForm!: FormGroup
  registerClientForm!: FormGroup

  constructor(private tokenStorage: TokenStorageService, private cityService: CitiesService, private masterService: MasterService, private authService: AuthorizationService,) {
  }

  checkPasswords : ValidatorFn = (group : AbstractControl) : ValidationErrors | null => {
    let password : String = group.get('password')?.value
    let rePassword : String = group.get('re_enterPassword')?.value
    return password === rePassword ? null : { notSame: true }
  }

  ngOnInit(): void {
    this.cityService.getCities().subscribe((data) => {
        this.cities = data
      }
    )
    this.masterService.getMasterTypes().subscribe((data) => {
      this.types = data
    })


    this.registerMasterForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl('', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
      re_enterPassword : new FormControl('',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
      role: new FormControl('ROLE_MASTER'),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      phone_number: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
      embg: new FormControl('', [Validators.required,Validators.pattern('[0-9]{13}')]),
      gender: new FormControl('male', [Validators.required]),
      type: new FormControl('Electrician', [Validators.required]),
      city: new FormControl(1, [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
    },this.checkPasswords)

    this.registerClientForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl('', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
      role: new FormControl('ROLE_CLIENT'),
      name: new FormControl('',[Validators.required]),
      surname: new FormControl('',[Validators.required]),
      phone_number: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
      gender: new FormControl('male',[Validators.required]),
      address: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      re_enterPassword : new FormControl('',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')])
    },this.checkPasswords)
  }

  registerMaster() {
    console.log(this.registerMasterForm)
    if(this.registerMasterForm.status == "INVALID"){
      console.log("Invalid form")
      return
    }
    this.authService.registerMaster(this.registerMasterForm.value)
    window.location.reload()
  }

  registerClient() {
    if(this.registerClientForm.status == "INVALID"){
      console.log("Invalid form")
      return
    }
    this.authService.registerClient(this.registerClientForm.value)
    window.location.reload()
  }
}

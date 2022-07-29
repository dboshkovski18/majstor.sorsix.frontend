import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/User";
import {Token} from "@angular/compiler";
import {TokenStorageService} from "../../services/token-storage.service";
import {BookingService} from "../../services/booking.service";
import {ClientService} from "../../services/client.service";
import {CitiesService} from "../../services/cities.service";
import {City} from "../../interfaces/City";
import {FormControl, FormGroup} from "@angular/forms";
import {Client} from "../../interfaces/Client";
import {Observable} from "rxjs";

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  user!: User

  client! : Client

  master_types!: string[]

  showEditForm: boolean = false;

  profileForm!: FormGroup

  constructor(private tokenService: TokenStorageService, private bookingService: BookingService, private clientService: ClientService, private cityService: CitiesService) {
  }

  ngOnInit(): void {

    this.user = this.tokenService.getUser()

    this.clientService.getClientById(this.user!.client.id).subscribe(data => {
      this.client = data

      this.profileForm = new FormGroup({
        name: new FormControl(data.name),
        surname: new FormControl(data.surname),
        phone_number: new FormControl(data.phone_number),
        email: new FormControl(data.email),
        gender: new FormControl(data.gender),
        address: new FormControl(data.address)
      });

    })



  }

  showEditFormEvent(): void {
    this.showEditForm = !this.showEditForm;
  }


  onEdit(): void {
    console.log("data" , this.profileForm.value)
    this.clientService.editClient(this.user!.client.id, this.profileForm.value.name, this.profileForm.value.surname, this.profileForm.value.phone_number, this.profileForm.value.email, this.profileForm.value.gender,this.profileForm.value.address);
    this.showEditForm = !this.showEditForm;
    window.location.reload()
  }


}

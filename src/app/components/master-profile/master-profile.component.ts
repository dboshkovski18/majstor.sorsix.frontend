import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {MasterService} from "../../services/master.service";
import {Master} from "../../interfaces/Master";
import {ClientService} from "../../services/client.service";
import {BehaviorSubject, debounceTime, flatMap, map, Observable, Subject, switchMap, tap} from "rxjs";
import {BookingService} from "../../services/booking.service";
import {Booking} from "../../interfaces/Booking";
import {ActivatedRoute} from "@angular/router";
import {Client} from "../../interfaces/Client";
import {CitiesService} from "../../services/cities.service";
import { City } from 'src/app/interfaces/City';

@Component({
  selector: 'app-master-profile',
  templateUrl: './master-profile.component.html',
  styleUrls: ['./master-profile.component.css']
})
export class MasterProfileComponent implements OnInit {

  master$!: Master;

  recommendations$!: Observable<number>

  subject$ = new BehaviorSubject<boolean>(true)

  id!: Number;

  master_types!: string[]

  showEditForm: boolean = false;

  cities! : Array<City>

  profileForm! : FormGroup

  constructor(private masterService: MasterService, private bookingService: BookingService, private route: ActivatedRoute, private clientService: ClientService, private cityService: CitiesService) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('master_id'))
    //We need to implement the User class first for dynamically id
    this.masterService.getMasterById(this.id).subscribe((data) => {
      this.master$ = data
      this.profileForm = new FormGroup({
        name: new FormControl(data.name),
        surname: new FormControl(data.surname),
        phone_number: new FormControl(data.phone_number),
        embg: new FormControl(data.embg),
        type: new FormControl(data.type),
        email: new FormControl(data.email),
        gender: new FormControl(data.gender),
        city: new FormControl(data.city.id)
      });
    })

    this.recommendations$ = this.subject$.pipe(
      debounceTime(200),
      flatMap(_ => this.masterService.getRecommendations(Number(this.id)))
    )

    this.cityService.getCities().subscribe((data) => {
      this.cities = data
    })

    this.loadAllMasterTypes()

  }

  showEditFormEvent(): void {
    this.showEditForm = !this.showEditForm;
  }

  loadAllMasterTypes() {
    return this.masterService.getMasterTypes().subscribe((data) => {
      console.log(data)
      this.master_types = data
    })
  }

  onEdit(): void {
    this.masterService.editMaster(this.id, this.profileForm.value.name, this.profileForm.value.surname,
      this.profileForm.value.phone_number, this.profileForm.value.email, this.profileForm.value.embg,
      this.profileForm.value.gender, this.profileForm.value.type, this.profileForm.value.city);
    this.showEditForm = !this.showEditForm;
    window.location.reload()
  }


  recommendMaster(id: number){
    this.clientService.recommendMaster('RECOMMENDED',2,Number(this.id))
    this.subject$.next(true)
  }



}

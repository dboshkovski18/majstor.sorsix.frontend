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
import {City} from 'src/app/interfaces/City';
import {User} from 'src/app/interfaces/User';
import {TokenStorageService} from "../../services/token-storage.service";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MasterEditComponent} from "../master-edit/master-edit.component";

@Component({
  selector: 'app-master-profile',
  templateUrl: './master-profile.component.html',
  styleUrls: ['./master-profile.component.css']
})
export class MasterProfileComponent implements OnInit {

  user: User | undefined

  master$!: Master;

  recommendations$!: Observable<number>

  subject$ = new BehaviorSubject<boolean>(true)

  id!: Number;

  master_types!: string[]

  showEditForm: boolean = false;

  cities!: Array<City>

  profileForm!: FormGroup

  isMasterLogged = false

  rated!: boolean

  constructor(private tokenService: TokenStorageService, private masterService: MasterService, private bookingService: BookingService, private route: ActivatedRoute, private clientService: ClientService, private cityService: CitiesService, public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.user = this.tokenService.getUser()

    if (!this.route.snapshot.paramMap.get("master_id")) {
      this.master$ = this.user.master

      this.masterService.getMasterById(this.master$.id).subscribe((data) => {
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

    } else {
      this.id = Number(this.route.snapshot.paramMap.get('master_id'))
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

    }

    this.recommendations$ = this.subject$.pipe(
      debounceTime(200),
      flatMap(_ => this.masterService.getRecommendations(Number(this.id)))
    )

    this.cityService.getCities().subscribe((data) => {
      this.cities = data
    })

    this.loadAllMasterTypes()


    this.clientService.checkIfMasterRatedByUser(this.user!.client.id, Number(this.id)).subscribe(data => {
      console.log(data)
      this.rated = data
    })
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
    console.log("data", this.profileForm.value)
    this.masterService.editMaster(this.user!.master.id, this.profileForm.value.name, this.profileForm.value.surname,
      this.profileForm.value.phone_number, this.profileForm.value.email, this.profileForm.value.embg,
      this.profileForm.value.gender, this.profileForm.value.type, this.profileForm.value.city);
    this.showEditForm = !this.showEditForm;
    window.location.reload()
  }

  onEditWithDialog(
    id: number,
    name: string,
    surname: string,
    phone_number: string,
    embg: number,
    gender: string,
    type: string,
    email: string,
    city_id: number
  ): void {
    this.masterService.editMaster(id, name, surname, phone_number, email, embg.toString(), gender, type, city_id)
    window.location.reload()
  }

  recommendMaster(id: number) {
    this.clientService.recommendMaster('RECOMMENDED', this.user!.client.id, Number(this.master$.id))
    this.subject$.next(true)
    window.location.reload()
  }

  editMasterDialog(): void {
    const dialogRef = this.dialog.open(MasterEditComponent, {
      width: '500px',
      height: '500px',
      data: {
        id: this.user!.master.id,
        name: this.master$.name,
        surname: this.master$.surname,
        phone_number: this.master$.phone_number,
        email: this.master$.email,
        embg: this.master$.embg,
        type: this.master$.type,
        city_id: this.master$.city.id,
        gender: this.master$.gender,
        status: this.master$.status
      },
    });
    dialogRef.afterClosed().subscribe(data => {
      this.onEditWithDialog(data.id, data.name, data.surname, data.phone_number, data.embg, data.gender, data.type, data.email, data.city_id)
    })
  }
}

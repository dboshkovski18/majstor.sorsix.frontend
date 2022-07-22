import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {MasterService} from "../../services/master.service";
import {Master} from "../../interfaces/Master";

@Component({
  selector: 'app-master-profile',
  templateUrl: './master-profile.component.html',
  styleUrls: ['./master-profile.component.css']
})
export class MasterProfileComponent implements OnInit {

  master!: Master;

  id!: Number;

  showEditForm: boolean = false;

  profileForm ! : FormGroup;

  constructor(private masterService: MasterService) {
  }

  ngOnInit(): void {
    //We need to implement the User class first for dynamically id
    this.masterService.getMasterById(5).subscribe(data => {
        this.master = data;
        this.profileForm = new FormGroup({
          name : new FormControl(this.master.name),
          surname : new FormControl(this.master.surname),
          phone_number : new FormControl(this.master.phone_number),
          embg : new FormControl(this.master.embg),
          type : new FormControl(this.master.type),
          email : new FormControl(this.master.email),
          gender : new FormControl(this.master.gender)
        })
      }
    )
  }

  showEditFormEvent(): void {
    this.showEditForm = !this.showEditForm;
  }

  onEdit(): void {
    this.masterService.editMaster(1, this.profileForm.value.name, this.profileForm.value.surname,
      this.profileForm.value.phone_number,this.profileForm.value.email,this.profileForm.value.embg,
      this.profileForm.value.gender,this.profileForm.value.type)
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Master} from "../../interfaces/Master";
import {CitiesService} from "../../services/cities.service";
import {City} from "../../interfaces/City";
import {MasterService} from "../../services/master.service";
import {MasterDto} from "../../interfaces/MasterDto";
@Component({
  selector: 'app-master-edit',
  templateUrl: './master-edit.component.html',
  styleUrls: ['./master-edit.component.css']
})
export class MasterEditComponent implements OnInit {

  cities! : City[];

  types! : String[];

  constructor(
    public dialogRef: MatDialogRef<MasterEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MasterDto,
    private cityService : CitiesService,
    private masterService : MasterService
  ) {}

  ngOnInit(): void {
    this.initTypes();
    this.initCities();
  }

  initCities() : void {
    this.cityService.getCities().subscribe(data => {
      this.cities = data;
    })
  }

  initTypes() : void {
    this.masterService.getMasterTypes().subscribe(data => {
      this.types = data;
    })
  }

  onNoClick() : void {
    this.dialogRef.close();
  }
}

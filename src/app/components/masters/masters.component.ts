import {Component, OnInit} from '@angular/core';
import {MasterService} from "../../services/master.service";
import {Master} from "../../interfaces/Master";
import {City} from "../../interfaces/City";
import {FormControl, FormGroup} from "@angular/forms";
import {CitiesService} from "../../services/cities.service";

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.css']
})
export class MastersComponent implements OnInit {

  cities!: City[]
  master_types!: string[]


  filterForm! : FormGroup

  masters!: Master[]

  totalRecords!: string
  page = 1

  constructor(private masterService: MasterService, private cityService: CitiesService) {
  }

  ngOnInit(): void {

    this.getMasters()
    this.loadAllCities()
    this.loadAllMasterTypes()
    this.filterForm =  new FormGroup({
      master_type: new FormControl('Painter'),
      city_id: new FormControl(1)
    })


    this.totalRecords = this.masters.length.toString()

  }

  getMasters(): void {
    this.page = 1
    this.masterService.getApprovedMasters ().subscribe(
      (data) => {
        this.masters = data
      }
    )
  }


  loadAllCities() {
    return this.cityService.getCities().subscribe((data) => {
      this.cities = data
    })
  }

  loadAllMasterTypes() {
    return this.masterService.getMasterTypes().subscribe((data) => {
      console.log(data)
      this.master_types = data
    })
  }

  onFilter() {
    console.log(this.filterForm.value)
    this.page = 1
    this.masterService.filterMasters(Number(this.filterForm.value.city_id)!, this.filterForm.value.master_type!).subscribe((data) => {
      this.masters = data
    })
  }

}

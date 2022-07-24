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


  filterForm = new FormGroup({
    master_type: new FormControl('Painter'),
    city_id: new FormControl(1)
  })

  masters!: Master[]

  constructor(private masterService: MasterService, private cityService: CitiesService) {
  }

  ngOnInit(): void {
    this.getMasters()
    this.loadAllCities()
    this.loadAllMasterTypes()
  }

  getMasters(): void {
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
    this.masterService.filterMasters(Number(this.filterForm.value.city_id)!, this.filterForm.value.master_type!).subscribe((data) => {
      this.masters = data
    })
  }

}

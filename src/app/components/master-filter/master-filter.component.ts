import { Component, OnInit } from '@angular/core';
import {City} from "../../interfaces/City";
import {CitiesService} from "../../services/cities.service";
import {MasterService} from "../../services/master.service";

@Component({
  selector: 'app-master-filter',
  templateUrl: './master-filter.component.html',
  styleUrls: ['./master-filter.component.css']
})
export class MasterFilterComponent implements OnInit {

  cities! : City[]
  master_types! : string[]


  constructor(private cityService: CitiesService, private masterService: MasterService) { }

  ngOnInit(): void {
    this.loadAllCities()
    this.loadAllMasterTypes()
  }

  loadAllCities(){
    return this.cityService.getCities().subscribe((data) => {
      this.cities = data
    })
  }

  loadAllMasterTypes(){
    return this.masterService.getMasterTypes().subscribe((data) =>{
      console.log(data)
      this.master_types = data
    })
  }

}

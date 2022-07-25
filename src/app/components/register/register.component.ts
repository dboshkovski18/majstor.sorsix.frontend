import { Component, OnInit } from '@angular/core';
import {City} from "../../interfaces/City";
import {CitiesService} from "../../services/cities.service";
import {Master} from "../../interfaces/Master";
import {MasterService} from "../../services/master.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  cities!: Array<City>
  types!: Array<string>

  constructor(private cityService: CitiesService, private masterService: MasterService) { }

  ngOnInit(): void {

    this.cityService.getCities().subscribe((data)=>{
      this.cities = data
      }
    )

    this.masterService.getMasterTypes().subscribe((data)=> {
      this.types = data
    })
  }

}

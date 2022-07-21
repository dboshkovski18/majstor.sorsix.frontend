import { Component, OnInit } from '@angular/core';
import {MasterService} from "../../services/master.service";
import {Master} from "../../interfaces/Master";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  masters! :Master[]

  constructor(private masterService: MasterService) { }

  ngOnInit(): void {
    this.getMasters()
  }

  getMasters(): void {
    this.masterService.getMasters().subscribe(
      (data) => {
        this.masters = data
      }
    )
  }

}

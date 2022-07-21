import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MasterService} from "./services/master.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private masterService : MasterService) {
  }

  getMasters(): void {
    this.masterService.getMasters().subscribe(
      (data) => {
        console.log(data)
      }
    )
  }

}

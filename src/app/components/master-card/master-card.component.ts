import {Component, Input, OnInit} from '@angular/core';
import {Master} from "../../interfaces/Master";
import {ClientService} from "../../services/client.service";
import {BehaviorSubject, debounceTime, flatMap, Observable} from "rxjs";
import {MasterService} from "../../services/master.service";

@Component({
  selector: 'app-master-card',
  templateUrl: './master-card.component.html',
  styleUrls: ['./master-card.component.css']
})
export class MasterCardComponent implements OnInit {

  @Input() master!: Master


  recommendations!: number


  constructor(private masterService: MasterService) { }

  ngOnInit(): void {
     this.masterService.getRecommendations(Number(this.master.id)).subscribe((data) => {
       this.recommendations = data
     })

  }

}

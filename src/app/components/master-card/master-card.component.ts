import {Component, Input, OnInit} from '@angular/core';
import {Master} from "../../interfaces/Master";
import {ClientService} from "../../services/client.service";
import {BehaviorSubject, debounceTime, flatMap, Observable} from "rxjs";
import {MasterService} from "../../services/master.service";
import {User} from "../../interfaces/User";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-master-card',
  templateUrl: './master-card.component.html',
  styleUrls: ['./master-card.component.css']
})
export class MasterCardComponent implements OnInit {

  @Input() master!: Master

  user : User | undefined

  recommendations!: number


  constructor(private masterService: MasterService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
     this.masterService.getRecommendations(Number(this.master.id)).subscribe((data) => {
       this.recommendations = data
     })

    this.user= this.tokenService.getUser()

  }

}

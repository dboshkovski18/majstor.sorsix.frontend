import {Component, Input, OnInit} from '@angular/core';
import {Master} from "../../interfaces/Master";

@Component({
  selector: 'app-master-card',
  templateUrl: './master-card.component.html',
  styleUrls: ['./master-card.component.css']
})
export class MasterCardComponent implements OnInit {

  @Input() master!: Master

  constructor() { }

  ngOnInit(): void {
  }

}

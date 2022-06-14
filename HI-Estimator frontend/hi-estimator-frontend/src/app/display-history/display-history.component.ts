import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-history',
  templateUrl: './display-history.component.html',
  styleUrls: ['./display-history.component.scss']
})
export class DisplayHistoryComponent implements OnInit {

  @Input()
  data!: PeriodicElement;
  constructor() { }

  ngOnInit(): void {
  }

}
export interface history {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

export interface PeriodicElement {
  plan: string;
  raisedDate: string;
  previous: string;
  updated: string;
  status: string
}
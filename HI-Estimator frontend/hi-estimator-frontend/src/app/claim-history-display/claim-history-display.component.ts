import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-claim-history-display',
  templateUrl: './claim-history-display.component.html',
  styleUrls: ['./claim-history-display.component.scss']
})
export class ClaimHistoryDisplayComponent implements OnInit {

  @Input() history:any
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onPrint(id : any){
    localStorage.setItem("histId", id);
    this.router.navigate(["/print"]);
  }

}



import { Router } from '@angular/router';
import { SignupComponent } from './../signup/signup.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialogModule,MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HistoryComponent implements OnInit {

  dataSource1 !:MatTableDataSource<any>;
  columnsCreated = [ 'policy', 'historyDate','result'];
  columnsToDisplay = [ 'policy', 'historyDate','result'];
  expandedElement: any
  

  displayedColumns = ['position', 'insurer', 'plan','edit']
  dataSource!:MatTableDataSource<any>;

  @ViewChild('paginator') paginator! : MatPaginator; 
  @ViewChild(MatSort) matSort! : MatSort;
  
  

  constructor(private http: HttpClient,private dialog: MatDialog,private router:Router) { 
    let username = localStorage.getItem("username");
    this.http.get("https://hi-estimator-backend-urtjok3rza-wl.a.run.app/getHistory/"+username)
    .subscribe((response:any) => {
      this.dataSource1 = new MatTableDataSource(response)
      this.dataSource1.paginator = this.paginator;
      
    })
   }

  ngOnInit(): void {
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onUpdate(){
    
  }

  onLogOut(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}








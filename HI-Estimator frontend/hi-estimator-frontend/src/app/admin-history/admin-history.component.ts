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
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AdminHistoryComponent implements OnInit {

  dataSource1 !:MatTableDataSource<any>;
  columnsCreated = [ 'policy', 'historyDate','result'];
  columnsToDisplay = [ 'email','policy', 'historyDate','result'];
  expandedElement: any
  

  displayedColumns = ['position', 'insurer', 'plan','edit']
  dataSource!:MatTableDataSource<any>;

  @ViewChild('paginator') paginator! : MatPaginator; 
  @ViewChild(MatSort) matSort! : MatSort;
  
  

  constructor(private http: HttpClient,private dialog: MatDialog,private router:Router) { 
    this.http.get("https://hi-estimator-backend-urtjok3rza-wl.a.run.app/get/allHistory")
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

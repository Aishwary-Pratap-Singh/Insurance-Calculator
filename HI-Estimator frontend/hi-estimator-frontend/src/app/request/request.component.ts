import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialogModule,MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';

  

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class RequestComponent implements OnInit {

  dataSource1 !:MatTableDataSource<any>;
  columnsCreated = [ 'plan', 'raisedDate','status'];
  columnsToDisplay = [ 'plan', 'raisedDate','status'];
  expandedElement: any

  

  requestUrl = "https://hi-estimator-backend-urtjok3rza-wl.a.run.app/request"
  requestPostUrl = "https://hi-estimator-backend-urtjok3rza-wl.a.run.app/getrequest"

  displayedColumns = ['position','plan','raisedDate','status']
  dataSource!:MatTableDataSource<any>;

  @ViewChild('paginator') paginator! : MatPaginator; 
  @ViewChild(MatSort) matSort! : MatSort;

  requestForm= new FormGroup({
    plan:new FormControl('',Validators.required),
    raisedDate:new FormControl('',Validators.required),
    previous:new FormControl('',Validators.required),
    updated:new FormControl('',Validators.required),
    status:new FormControl('pending')
  })

  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.loadData()
  }

  onLogOut(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  onRaiseTicket(){
    let formData = this.requestForm.value
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem("token") });
      
  let options = { headers: headers };
    console.log(JSON.parse(JSON.stringify(formData)))
    this.http.post(this.requestUrl,formData,options).subscribe(
      response => {
      this.loadData()}
    )
//  *****implement this*****
    // this.http.post(this.requestPostUrl,formData)
    //   .subscribe((data:any) => {
        
    //   })
  }
  loadData(){
    let dateToday = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    this.requestForm.controls['raisedDate'].setValue(dateToday);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem("token") });
    let options = { headers: headers };

    this.http.get(this.requestPostUrl,options)
    .subscribe((data: any) => {
      this.dataSource1 = new MatTableDataSource(data);
      console.log(this.dataSource1)
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.matSort;
    });
  }
}

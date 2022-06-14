import { Router } from '@angular/router';
import { SignupComponent } from './../signup/signup.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialogModule,MatDialog, MatDialogConfig} from '@angular/material/dialog';
  

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  insurance:any;
  array:any;
  array1 : any[] =[];

  // displayedColumns = ['name','username','email'];
  displayedColumns = ['position', 'insurer', 'plan','edit']
  dataSource!:MatTableDataSource<any>;

  @ViewChild('paginator') paginator! : MatPaginator; 
  @ViewChild(MatSort) matSort! : MatSort;
  
  

  constructor(private http: HttpClient,private dialog: MatDialog,private router:Router) {  }

  ngOnInit(): void {
    this.http.get('https://hi-estimator-backend-urtjok3rza-wl.a.run.app/get/allPolicy'
    // , { responseType: 'text' }
    )
    .subscribe((data: any) => {
      // this.array1 = JSON.parse(data);
      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource)
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      
    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onCreate() {
    // this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(SignupComponent,dialogConfig);

    // this.dataSource = this.dataSource.filter((value,key)=>{
    //   if(value.id == row_obj.id){
    //     value.name = row_obj.name;
    //   }
  }

  onUpdate(){
    this.router.navigate(["/admin/request"])
  }

  onLogOut(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

}

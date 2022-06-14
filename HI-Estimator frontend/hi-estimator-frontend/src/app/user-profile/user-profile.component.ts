import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserDetailsInputComponent } from '../user-details-input/user-details-input.component';
import { ProfilePicUploadComponent } from '../profile-pic-upload/profile-pic-upload.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userUrl = "https://hi-estimator-backend-urtjok3rza-wl.a.run.app/user/";
  
  phone = 0;
  policyNumber = 123 ;
  purchasedAmount = 999;
  purchasedOn = "17-mar-2019";
  dueDate = "17-july-2022";
  estimatedAmount = 29000;
  imageString: any;
  username: string | null | undefined;
  address: any;
  email: any;
  lastname: any;
  firstname: any;


  constructor(private http:HttpClient,private router:Router, private dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    let username = localStorage.getItem("username")
    
    this.username = localStorage.getItem("username");
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    let options = { headers: headers };
    this.http
      .get(this.userUrl + this.username, options)
      .subscribe((response: any) => {
        this.policyNumber = response["policyNumber"]
        this.dueDate = response["dueDate"]
        this.purchasedAmount = response["premiumAmount"]
        this.purchasedOn = response["purchasedDate"]
        this.phone = response["phone"]
        this.address = response["address"]
        this.email = response["email"]
        this.firstname = response["firstname"]
        this.lastname = response["lastname"]
        this.imageString = response["image"]
      });
  }

  openProfileDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.minWidth = "250px"
    dialogConfig.maxHeight = "80vh";
    this.dialog.open(UserDetailsInputComponent,dialogConfig);
  }

  openImageDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.maxWidth = "450px";
    dialogConfig.minWidth = "250px";
    dialogConfig.minHeight = "75vh";
    dialogConfig.maxHeight = "80vh";
    this.dialog.open(ProfilePicUploadComponent,dialogConfig);
  }

  onLogOut(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-user-details-input",
  templateUrl: "./user-details-input.component.html",
  styleUrls: ["./user-details-input.component.scss"],
})
export class UserDetailsInputComponent implements OnInit {
  disable = true;
  userUrl = "https://hi-estimator-backend-urtjok3rza-wl.a.run.app/user/";
  url = "https://hi-estimator-backend-urtjok3rza-wl.a.run.app/put"
  username: string | undefined | null;

  password: any;
  image: any;

  updateForm = new FormGroup({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    email: new FormControl(""),
    date: new FormControl(""),
    phone: new FormControl(""),
    address: new FormControl(""),
    policyNumber: new FormControl(""),
    purchasedDate: new FormControl(""),
    dueDate: new FormControl(""),
    premiumAmount: new FormControl(""),
    alreadyClaimedAmount: new FormControl(""),
    image: new FormControl(""),
    password: new FormControl("")
  });

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<UserDetailsInputComponent>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(){
    this.username = localStorage.getItem("username");
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    let options = { headers: headers };
    this.http
      .get(this.userUrl + this.username, options)
      .subscribe((response: any) => {
        this.updateForm.controls["firstname"].setValue(response["firstname"]);
        this.updateForm.controls["lastname"].setValue(response["lastname"]);
        this.updateForm.controls["email"].setValue(response["email"]);
        this.updateForm.controls["date"].setValue(response["date"]);
        this.updateForm.controls["phone"].setValue(response["phone"]);
        this.updateForm.controls["address"].setValue(response["address"]);
        this.updateForm.controls["policyNumber"].setValue(
          response["policyNumber"]
        );
        this.updateForm.controls["purchasedDate"].setValue(
          response["purchasedDate"]
        );
        this.updateForm.controls["dueDate"].setValue(response["dueDate"]);
        this.updateForm.controls["premiumAmount"].setValue(
          response["premiumAmount"]
        );
        this.updateForm.controls["alreadyClaimedAmount"].setValue(
          response["alreadyClaimedAmount"]
        );
        this.password = response["password"]
        this.image = response["image"]
        console.log(this.password)
        console.log(this.image)
      });
  }

  onUpdate(){
    
    this.updateForm.controls['password'].setValue(this.password)
    this.updateForm.controls['image'].setValue(this.image)
    let post = this.updateForm.value
    console.log(post)
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      responseType: 'text',
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };


    this.http.put(this.url,post,options).subscribe(
      (response: any) => {
        if (response === "successfully updated"){
          this.onSuccess()
        }
        else{
          this.onFailure()
        }
      }
      
    )
    this.onClose()
  }

  onCancel(){
    this.initializeForm()
  }


  onClose() {
    this.dialogRef.close();
  }

  onSuccess(){
    this._snackBar.open('Successfully Updated!!', 'OK', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration:5000,
      panelClass: ['green-snackbar']
    });
  }

  onFailure(){
    this._snackBar.open('Error Occurred!!', 'OK', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration:5000,
      panelClass: ['red-snackbar']
    });
  }
}

function doSomewithOnSuccess(event: Object): void {
  throw new Error("Function not implemented.");
}


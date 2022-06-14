import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ErrorStateMatcher } from "@angular/material/core";
import { FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { FormGroup, FormControl } from "@angular/forms";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  url = "https://hi-estimator-backend-urtjok3rza-wl.a.run.app/post";

  json = {};
  imageString =
    "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";

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  signUpForm = new FormGroup({
    firstname: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern("^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$"),
    ]),
    role: new FormControl("GENERAL"),
  });
  
  signUp() {
    let post = this.signUpForm.value;
    console.log(post);
    this.http.post(this.url, post).subscribe((response) => {
      this._snackBar.open("Successfully Registered!!", "OK", {
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 5000,
        panelClass: ["green-snackbar"],
      });
      this.addPictures()
      this.router.navigate(["/login"]);
    });
  }

  addPictures() {
    this.json = {
      email: this.signUpForm.controls['email'].value,
      image: this.imageString,
    };
    this.http
      .put("https://hi-estimator-backend-urtjok3rza-wl.a.run.app/img/update", this.json)
      .subscribe((response) => {
        console.log(response);
      });
  }
}

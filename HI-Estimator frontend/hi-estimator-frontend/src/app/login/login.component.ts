import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  li:any;
  url = "https://hi-estimator-backend-urtjok3rza-wl.a.run.app/authenticate"
  userUrl = "https://hi-estimator-backend-urtjok3rza-wl.a.run.app/user/"

  matcher = new MyErrorStateMatcher();
  username: string | undefined;

  constructor(public http:HttpClient,private router:Router) { }

  registerForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')])
  });

  onSignUp(){
    this.router.navigate(['/signup'])
  }

  login(){
    
    let post=this.registerForm.value;
    this.username = this.registerForm.controls['email'].value
    localStorage.setItem("username",this.registerForm.controls['email'].value)
    
    
    let res: any = { jwt: ""};
    this.http.post(this.url,post,{responseType: "text"})
    .subscribe(response => {

      this.li=response;
        this.split();
        if (this.li[1].slice(1,-2)) {
          localStorage.setItem("token",this.li[1].slice(1,-2))
          
          console.log(localStorage.getItem("token"))
          this.checkUserRole()
        }
    })
  }
  
  split(){
    this.li=this.li.split(':')
    }

  checkUserRole() {
    console.log('Bearer '+localStorage.getItem("token"))
    this.username = this.registerForm.controls['email'].value
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem("token") });
      
  let options = { headers: headers };
  
 
    this.http.get(this.userUrl+this.username,options).subscribe((response:any) => {
      let role = response["role"]
      
      if (role == "ADMIN"){
        this.router.navigate(['/admin/policy'])
      }
      else{
        this.router.navigate(['/home'])
      }
    })
  }
}




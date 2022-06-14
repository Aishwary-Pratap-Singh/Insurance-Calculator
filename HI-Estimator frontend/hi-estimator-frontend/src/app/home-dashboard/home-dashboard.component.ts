import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {
  userUrl = "https://hi-estimator-backend-urtjok3rza-wl.a.run.app/user/";
  username: string | null | undefined;
  firstname: any;
  lastname: any;

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    this.http
      .get(this.userUrl + this.username, options)
      .subscribe((response: any) => {
        
        this.firstname = response["firstname"]
        this.lastname = response["lastname"]
      });
  }
  
  onEstimate(){
    this.router.navigate(['/home/claim'])
  }

  onLogOut(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}

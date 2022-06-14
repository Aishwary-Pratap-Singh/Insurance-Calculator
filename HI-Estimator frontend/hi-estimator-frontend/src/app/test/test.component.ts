import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material/dialog";
import { SignupComponent } from "../signup/signup.component";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
})
export class TestComponent implements OnInit {
  data1: any;

  selectedDisease: string | undefined;

  object2: any[] = [];

  insurerName!: string;
  plans: any[] = [];
  disease: any[] = [];
  hospital: any;
  coPay: any[] = [];
  cover: any[] = [];
  optedRent: any[] = [];

  disable = false;
  disableRent = false;
  disableCoPay = false;
  disableCoverAndDisease = false
  show = false;
  estimate: Number | undefined;

  // getsubplan = url
  // getdetails = url
  // getPostUrl = api
  // calculateUrl = api - link

  claimForm = new FormGroup({
    policy: new FormControl("", Validators.required),
    sub_plan: new FormControl(""),
    cover: new FormControl(""),
    disease: new FormControl(""),
    hospital_charges: new FormControl(""),
    co_pay: new FormControl({value: 20, disabled: this.disableCoPay}),
    disease_claims: new FormControl(""),
    past_claims: new FormControl("", Validators.required),
    opted_rent: new FormControl(""),
    rent: new FormControl(""),
  });

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {
    // get all plans
    this.http.get("https://hi-estimator-backend-urtjok3rza-wl.a.run.app/get/plans").subscribe((data: any) => {
      // console.log(data)
      this.data1 = data;
    });
  }

  // get sub-plans if any or get plan details
  onPlan(event: { isUserInput: any; source: { value: any; selected: any } }) {
    if (event.isUserInput) {
      this.insurerName = event.source.value;
    }

    // console.log(this.insurerName)
    this.http
      .get(
        "https://hi-estimator-backend-urtjok3rza-wl.a.run.app/insuranceCalculator/input_options/" +
          this.insurerName
      )
      .subscribe((data: any) => {
        if ("sub_plans" in data) {
          this.disable = false;
          this.plans = data["sub_plans"];
          this.getPlanDetails(this.insurerName);
        } else {
          this.disable = true;
          // this.claimForm.controls['subPlan'].setValue("")

          this.getPlanDetails(this.insurerName);
          console.log(2);
        }
        this.claimForm.controls["cover"].setValue("");
        this.claimForm.controls["disease"].setValue("");
        this.claimForm.controls["coPay"].setValue("");
        this.claimForm.controls["hospital"].setValue("");
        this.claimForm.controls["opted_rent"].setValue("");
        this.claimForm.controls["rent"].setValue("");
      });
  }

  // get sub-plans of insurance policy selected
  // onSubPlan(event: { isUserInput: any; source: { value: any; selected: any; }; })
  // {
  //   if(event.isUserInput) {
  //     var plan = event.source.value;
  //   }
  //   // this.getPlanDetails(plan)
  // }

  onDisease(event: {
    isUserInput: any;
    source: { value: any; selected: any };
  }) {
    this.selectedDisease = event.source.value;
  }

  getPlanDetails(planName: string) {
    // change url before integration
    this.http
      .get(
        "https://hi-estimator-backend-urtjok3rza-wl.a.run.app/insuranceCalculator/input_options/" +
          planName
      )
      .subscribe((data: any) => {
        console.log(data);
        
        this.hospital = data["hospital_charges"];
        
        
        if ("opted_rent" in data) {
          this.disableRent = false;
          this.optedRent = data["opted_rent"];
        } else {
          this.disableRent = true;
        }

        if ("co_pay" in data) {
          this.disableCoPay = false;
          this.coPay = data["co_pay"];
        } else {
          this.disableCoPay = true;
        }
        if ("cover" in data) {
          this.disableCoverAndDisease = false;
          this.cover = data["cover"];
          this.disease = data["diseases"];
        } else {
          this.disableCoverAndDisease = true;
        }
      });
  }

  onCalculate() {
    let post = this.claimForm.value;
    let plan = this.claimForm.controls["policy"].value;
    console.log(post);
    this.http
      .post("https://hi-estimator-backend-urtjok3rza-wl.a.run.app/insuranceCalculator/calculate/" + plan, post)
      .subscribe((data: any) => {
        console.log(data);
        this.estimate = data;

        let dateToday = new Date().toJSON().slice(0, 10);
        let json = {
          email: localStorage.getItem("username"),
          historyDate: dateToday,
          policy: this.claimForm.controls["policy"].value,
          sub_plan: this.claimForm.controls["sub_plan"].value,
          cover: this.claimForm.controls["cover"].value,
          disease: this.claimForm.controls["disease"].value,
          hospital_charges: this.claimForm.controls["hospital_charges"].value,
          co_pay: this.claimForm.controls["co_pay"].value,
          disease_claims: this.claimForm.controls["disease_claims"].value,
          past_claims: this.claimForm.controls["past_claims"].value,
          opted_rent: this.claimForm.controls["opted_rent"].value,
          rent: this.claimForm.controls["rent"].value,
          result: this.estimate,
        };
        console.log(json);
        this.http
          .post("https://hi-estimator-backend-urtjok3rza-wl.a.run.app/history/add", json)
          .subscribe((data: any) => {
            localStorage.setItem("histId", data["id"]);
            this.onPrint()
          });
      });
    this.show = true;
  }

  onOkay() {
    this.show = false;
  }

  onPrint() {
    this.router.navigate(["/print"]);
  }

  onLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("histId")
    this.router.navigate(["/login"]);
  }

  ngOnInit(): void {}
}

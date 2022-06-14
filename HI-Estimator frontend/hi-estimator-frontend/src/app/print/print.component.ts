import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
  hospitalCharges: any;
  diseaseIndentified: any;
  coverAmount: any;
  diseaseClaims: any;
  email: any;
  optedRent: any;
  pastClaims: any;
  policy: any;
  rent: any;
  result: any;
  subPlan: any;
  historyDate: any;
  coPay: any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    let id = localStorage.getItem("histId")
    this.http.get('https://hi-estimator-backend-urtjok3rza-wl.a.run.app/getHistoryById/'+id)
    .subscribe( (response:any) => {
      this.hospitalCharges = response['hospital_charges']
      this.diseaseIndentified = response['disease']
      this.coverAmount = response['cover']
      this.diseaseClaims = response['disease_claims']
      this.email = response['email']
      this.optedRent = response['opted_rent']
      this.pastClaims = response['past_claims']
      this.policy = response['policy']
      this.rent = response['rent']
      this.result = response['result']
      this.subPlan = response['sub_plan']
      this.historyDate = response['historyDate']
      this.coPay = response['co_pay']
    })


  }

 

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('policyreport.pdf');
    });
  }
}
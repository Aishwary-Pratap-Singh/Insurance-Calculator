package com.example.demo.Models;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    private String email;

    @JsonFormat(pattern="yyyy-MM-dd")
    private Date historyDate;

    private String policy;
    private String sub_plan;
    private long cover;
    private String disease;
    private long hospital_charges;
    private long co_pay;
    private long past_claims;
    private long disease_claims;
    private long opted_rent;
    private long rent;
    private long result;

    public long getResult() {
        return result;
    }

    public void setResult(long result) {
        this.result = result;
    }

    public long getOpted_rent() {
        return opted_rent;
    }

    public void setOpted_rent(long opted_rent) {
        this.opted_rent = opted_rent;
    }

    public long getRent() {
        return rent;
    }

    public void setRent(long rent) {
        this.rent = rent;
    }
// Mapping the column of this table
    // @ManyToOne
    //Adding the name
//    @JoinColumn(name = "email")
//    private User user;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getHistoryDate() {
        return historyDate;
    }

    public void setHistoryDate(Date historyDate) {
        this.historyDate = historyDate;
    }

    public String getPolicy() {
        return policy;
    }

    public void setPolicy(String policy) {
        this.policy = policy;
    }

    public String getSub_plan() {
        return sub_plan;
    }

    public void setSub_plan(String sub_plan) {
        this.sub_plan = sub_plan;
    }

    public long getCover() {
        return cover;
    }

    public void setCover(long cover) {
        this.cover = cover;
    }

    public String getDisease() {
        return disease;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public long getHospital_charges() {
        return hospital_charges;
    }

    public void setHospital_charges(long hospital_charges) {
        this.hospital_charges = hospital_charges;
    }

    public long getCo_pay() {
        return co_pay;
    }

    public void setCo_pay(long co_pay) {
        this.co_pay = co_pay;
    }

    public long getPast_claims() {
        return past_claims;
    }

    public void setPast_claims(long past_claims) {
        this.past_claims = past_claims;
    }

    public long getDisease_claims() {
        return disease_claims;
    }

    public void setDisease_claims(long disease_claims) {
        this.disease_claims = disease_claims;
    }
}

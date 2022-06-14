package com.example.demo.helperObjects;

public class HealthGuard {
    private String policy;
    private String sub_plan;
    private long cover;
    private String disease;
    private long hospital_charges;
    private long co_pay;
    private long past_claims;
    private long disease_claims;

    public HealthGuard(String policy, String sub_plan, long cover, String disease, long hospital_charges, long co_pay, long past_claims, long disease_claims) {
        this.policy = policy;
        this.sub_plan = sub_plan;
        this.cover = cover;
        this.disease = disease;
        this.hospital_charges = hospital_charges;
        this.co_pay = co_pay;
        this.past_claims = past_claims;
        this.disease_claims = disease_claims;
    }

    public void setPolicy(String policy) {
        this.policy = policy;
    }

    public void setSub_plan(String sub_plan) {
        this.sub_plan = sub_plan;
    }

    public void setCover(long cover) {
        this.cover = cover;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public void setHospital_charges(long hospital_charges) {
        this.hospital_charges = hospital_charges;
    }

    public void setCo_pay(long co_pay) {
        this.co_pay = co_pay;
    }

    public void setPast_claims(long past_claims) {
        this.past_claims = past_claims;
    }

    public void setDisease_claims(long disease_claims) {
        this.disease_claims = disease_claims;
    }

    public String getPolicy() {
        return policy;
    }

    public String getSub_plan() {
        return sub_plan;
    }

    public long getCover() {
        return cover;
    }

    public String getDisease() {
        return disease;
    }

    public long getHospital_charges() {
        return hospital_charges;
    }

    public long getCo_pay() {
        return co_pay;
    }

    public long getPast_claims() {
        return past_claims;
    }

    public long getDisease_claims() {
        return disease_claims;
    }
}

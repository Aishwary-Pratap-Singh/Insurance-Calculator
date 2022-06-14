package com.example.demo.helperObjects;

public class HealthInfinity {
    private long opted_rent;
    private long rent;
    private String policy;
    private long hospital_charges;
    private long co_pay;

    public long getCo_pay() {
        return co_pay;
    }

    public HealthInfinity(long opted_rent, long rent, String policy, long hospital_charges) {
        this.opted_rent = opted_rent;
        this.rent = rent;
        this.policy = policy;
        this.hospital_charges = hospital_charges;
    }

    public long getOpted_rent() {
        return opted_rent;
    }

    public long getRent() {
        return rent;
    }

    public String getPolicy() {
        return policy;
    }

    public long getHospital_charges() {
        return hospital_charges;
    }
}

package com.example.demo.Models;

public class ResponseJwt {

    private String jwt;

    public ResponseJwt(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

}

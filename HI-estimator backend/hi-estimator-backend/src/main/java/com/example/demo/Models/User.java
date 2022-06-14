package com.example.demo.Models;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
public class User {

    //    column details

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    private String firstname;
    private String lastname;

    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date;

    @Id
    private String email;


    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private String image;


//    @OneToMany(targetEntity = History.class,cascade = CascadeType.ALL)
//    @JoinColumn(referencedColumnName = "email")
//    private List<History> history;

    private String password;
    private String role;


    private int policyNumber;

    @JsonFormat(pattern="yyyy-MM-dd")
    private Date purchasedDate;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dueDate;

    private int premiumAmount;
    private int alreadyClaimedAmount;

    private String phone;
    private String address;


    public User() {
    }

    public User(int userId, String firstname, String lastname, Date date, String email, String password, String role) {
        this.userId = userId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.date = date;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // getters and setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }


    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }


//    public List<History> getHistory() {
//        return history;
//    }
//
//    public void setHistory(List<History> history) {
//        this.history = history;
//    }

    public int getPolicyNumber() {
        return policyNumber;
    }

    public void setPolicyNumber(int policyNumber) {
        this.policyNumber = policyNumber;
    }

    public Date getPurchasedDate() {
        return purchasedDate;
    }

    public void setPurchasedDate(Date purchasedDate) {
        this.purchasedDate = purchasedDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public int getPremiumAmount() {
        return premiumAmount;
    }

    public void setPremiumAmount(int premiumAmount) {
        this.premiumAmount = premiumAmount;
    }

    public int getAlreadyClaimedAmount() {
        return alreadyClaimedAmount;
    }

    public void setAlreadyClaimedAmount(int alreadyClaimedAmount) {
        this.alreadyClaimedAmount = alreadyClaimedAmount;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}

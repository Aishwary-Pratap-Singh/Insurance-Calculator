package com.example.demo.Models;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Lob;

public class ImageClass {


    @Id
    private String email;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private String image;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}

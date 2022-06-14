package com.example.demo.Services;

// Importing required classes


import com.example.demo.Models.EmailDetails;


// Interface
public interface EmailService {

    // Method
    // To send a simple email
    String sendSimpleMail(EmailDetails details);

    // Method
    // To send an email with attachment
//    String sendMailWithAttachment(EmailDetails details);
}
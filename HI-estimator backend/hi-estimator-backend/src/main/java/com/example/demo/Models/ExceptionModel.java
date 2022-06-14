package com.example.demo.Models;

import lombok.Data;

public @Data class ExceptionModel {

    private int status;
    private String message;
    private long timestamp;
    public ExceptionModel() {
    }
    public ExceptionModel(int status, String message, long timestamp) {
        this.status = status;
        this.message = message;
        this.timestamp = timestamp;
    }

}

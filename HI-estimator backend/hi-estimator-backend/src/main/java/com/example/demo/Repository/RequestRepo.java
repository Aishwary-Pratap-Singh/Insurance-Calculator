package com.example.demo.Repository;

import com.example.demo.Models.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepo extends JpaRepository<Request,Integer> {
}

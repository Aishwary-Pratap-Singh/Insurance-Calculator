package com.example.demo.Repository;


import com.example.demo.Models.History;
import com.example.demo.Models.User;
import com.example.demo.helperObjects.HealthInfinity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History,Integer> {

    // List<History> findAll();

    History findHistoryById(Integer id);
    History findByEmail(String email);

    List<History> findAllHistoryByEmail(String email);

}

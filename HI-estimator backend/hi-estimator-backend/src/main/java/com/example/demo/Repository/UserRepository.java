package com.example.demo.Repository;

import com.example.demo.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User,Integer> {


    List<User> findAll();

    User findByEmail(String email);

    User findUserByEmail(String email);

}

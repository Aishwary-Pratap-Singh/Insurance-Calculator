package com.example.demo.Repository;

import com.example.demo.Models.InsurerPlans;
import org.springframework.data.repository.CrudRepository;

public interface PolicyRepository extends CrudRepository<InsurerPlans,Integer> {

}

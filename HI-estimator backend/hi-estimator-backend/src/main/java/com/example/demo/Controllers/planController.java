package com.example.demo.Controllers;
import com.example.demo.Models.InsurerPlans;
import com.example.demo.Repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = {"https://hi-estimator-frontend-urtjok3rza-el.a.run.app","http://localhost:4200"}, maxAge = 3600,exposedHeaders = "Access-Control-Allow-Origin")
@RestController
public class planController {

    @Autowired
    PolicyRepository policyRepository;
    @PostMapping("/add")
    public InsurerPlans addPolicy(@RequestBody InsurerPlans insurerPlans){
        policyRepository.save(insurerPlans);
        return (insurerPlans);
    }

    @GetMapping("get/allPolicy")
    public List<InsurerPlans>findAllPolicy(){
        return (List<InsurerPlans>) policyRepository.findAll();
    }

    @GetMapping("get/plans")
    public List<String> getAllPlans(){
        ArrayList<String> plans = new ArrayList<>();
        List<InsurerPlans> insurerPlans = (List<InsurerPlans>) policyRepository.findAll();
        for(InsurerPlans a : insurerPlans ){
            plans.add(a.getPlan());
        }
        return plans;
    }
}

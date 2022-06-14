package com.example.demo.controllers;

import com.example.demo.helperObjects.CriticalIllness;
import com.example.demo.helperObjects.FrontendOptions;
import com.example.demo.helperObjects.HealthGuard;
import com.example.demo.helperObjects.HealthInfinity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = {"https://hi-estimator-frontend-urtjok3rza-el.a.run.app","http://localhost:4200"}, maxAge = 3600,exposedHeaders = "Access-Control-Allow-Origin")
@RestController
public class PolicyController {
    FrontendOptions options = new FrontendOptions();

    @PostMapping(value="/insuranceCalculator/calculate/health_guard")
    public double health_guard(@RequestBody HealthGuard inputs){
        if(inputs.getPast_claims() == inputs.getCover())
            return 0;
        double result = 0,available = inputs.getCover() - inputs.getPast_claims();
        if(inputs.getSub_plan().equals("silver")){
            switch(inputs.getDisease()){
                case "cataract_surgery":{
//                    double coverableAmount = Math.min(0.20 * inputs.getCover(),inputs.getHospital_charges());
                    double coverableAmount = Math.min(0.20 * available,inputs.getHospital_charges());
                    result = Math.min(available,coverableAmount);
                    break;
                }

                case "Road_Ambulance":{
                    result = Math.min(available,20000 - inputs.getDisease_claims());
                    break;
                }

                case "Bariatric_surgery":{
                    double coverableAmount = Math.min(0.25 * inputs.getCover(),inputs.getHospital_charges());
                    result = Math.min(available,coverableAmount);
                    break;
                }

                case "Mental_illness":{
                    double coverableAmount = Math.min(0.25 * inputs.getCover(),inputs.getHospital_charges());
                    result = Math.min(available,coverableAmount);
                    break;
                }

                case "modern_advanced_methods":{
                    double coverableAmount = Math.min(0.50 * inputs.getCover(),inputs.getHospital_charges());
                    result = Math.min(available,coverableAmount);
                    break;
                }
            }
        }else{
            switch(inputs.getDisease()){
                case "cataract_surgery":{
                    if(inputs.getDisease_claims() == 100000)
                        return 0;
                    double diseaseInsuranceAvail = Math.min(available,100000 - inputs.getDisease_claims());
                    double coverableAmount = 0.2 * inputs.getCover();
                    result = Math.min(coverableAmount,diseaseInsuranceAvail);
                    break;
                }

                case "Road_Ambulance":{
                    if(inputs.getDisease_claims() == 20000)
                        return 0;
                    result = Math.min(available,20000 - inputs.getDisease_claims());
                    break;
                }

                case "Ayurvedic/Homeopathic":{
                    if(inputs.getDisease_claims() >= 20000)
                        return 0;
                    result = Math.min(available,Math.min(20000 - inputs.getDisease_claims(),inputs.getHospital_charges()));
                    break;
                }

                case "Bariatric_surgery":{
                    if(inputs.getDisease_claims() >= 500000)
                        return 0;
                    double diseaseInsuranceAvail = Math.min(available,500000 - inputs.getDisease_claims());
                    double coverableAmount = 0.5 * inputs.getCover();
                    result = Math.min(coverableAmount,Math.min(diseaseInsuranceAvail,inputs.getHospital_charges()));
                    break;
                }

                case "Mental_illness":{
                    double coverableAmount = 0.25 * inputs.getCover();
                    result = Math.min(available,Math.min(coverableAmount,Math.min(200000,inputs.getHospital_charges())));
                    break;
                }

                case "modern_advanced_methods":{
                    double coverableAmount = 0.5 * inputs.getCover();
                    result = Math.min(available,Math.min(500000,Math.min(coverableAmount,inputs.getHospital_charges())));
                    break;
                }

                case "MaternityNormal_delivery":{
                    if(inputs.getCover() >= 300000 && inputs.getCover() <= 750000){
                        if(inputs.getDisease_claims() == 15000)
                            return 0;
                        result = Math.min(available,Math.min(inputs.getHospital_charges(),15000 - inputs.getDisease_claims()));
                        break;
                    }else if(inputs.getCover() > 750000){
                        if(inputs.getDisease_claims() == 25000)
                            return 0;
                        result = Math.min(available,Math.min(inputs.getHospital_charges(),25000 - inputs.getDisease_claims()));
                        break;
                    }else
                        return 0;
                }

                case "MaternityCaesarian_delivery":{
                    if(inputs.getCover() >= 300000 && inputs.getCover() <= 750000){
                        if(inputs.getDisease_claims() == 25000)
                            return 0;
                        result = Math.min(available,Math.min(inputs.getHospital_charges(),25000 - inputs.getDisease_claims()));
                        break;
                    }else if(inputs.getCover() > 750000){
                        if(inputs.getDisease_claims() == 35000)
                            return 0;
                        result = Math.min(available,Math.min(inputs.getHospital_charges(),35000 - inputs.getDisease_claims()));
                        break;
                    }else
                        return 0;
                }
            }
        }
        result -= (result * 0.01 * inputs.getCo_pay());
        return result;
    }

    @PostMapping(value="/insuranceCalculator/calculate/health_infinity")
    public double health_infinity(@RequestBody HealthInfinity inputs){
        long room_rent_cover = inputs.getOpted_rent() * 100;
        if(inputs.getRent() > room_rent_cover)
            return 0;
        if(inputs.getHospital_charges() > room_rent_cover){
            double remaining = inputs.getHospital_charges() - room_rent_cover;
            remaining -= (remaining * (inputs.getCo_pay() * 0.01));
            return (double)(remaining + room_rent_cover);
        }
        return 1.0 * inputs.getHospital_charges();
    }

    @PostMapping(value="/insuranceCalculator/calculate/critical_illness")
    public double critical_illness(@RequestBody CriticalIllness inputs){
        double available = inputs.getCover() - inputs.getPast_claims(),result = 0;
        result = Math.min(available,inputs.getHospital_charges()) * 0.8;
        return result;
    }

    @GetMapping(value="/insuranceCalculator/input_options/health_guard")
    public HashMap<String, List<String>> health_guard_inputs(){
        return options.getHealth_guard();
    }

    @GetMapping(value="/insuranceCalculator/input_options/health_infinity")
    public HashMap<String, List<String>> health_infinity_inputs(){
        return options.getHealth_infinity();
    }

    @GetMapping(value="/insuranceCalculator/input_options/critical_illness")
    public HashMap<String, List<String>> critical_illness_inputs(){
        return options.getCritical_illness();
    }
}













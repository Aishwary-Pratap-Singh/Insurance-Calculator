package com.example.demo.Controllers;

import com.example.demo.Models.*;
import com.example.demo.Repository.RequestRepo;
import com.example.demo.Services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"https://hi-estimator-frontend-urtjok3rza-el.a.run.app","http://localhost:4200"}, maxAge = 3600,exposedHeaders = "Access-Control-Allow-Origin")
@RestController
public class RequestController {

    @Autowired
    RequestRepo requestRepo;
    
    @Autowired
    EmailService emailService;

    @CrossOrigin(exposedHeaders="Access-Control-Allow-Origin")
    @RequestMapping(value = "/request",method = RequestMethod.POST)
    public void request(@RequestBody Request request){
        //System.out.println(request.getId());
        requestRepo.save(request);
    }

    @CrossOrigin(exposedHeaders="Access-Control-Allow-Origin")
    @RequestMapping(value = "/getrequest",method = RequestMethod.GET)
    public List<Request> getAll(){
        return requestRepo.findAll();
    }

    @RequestMapping(value = "/updateStatus",method = RequestMethod.PUT)
    public String updateStatus(@RequestBody RequestTemp requestTemp){
        Request request=requestRepo.getById(requestTemp.getId());
        request.setStatus(requestTemp.getStatus());
        requestRepo.save(request);

        EmailDetails details = new EmailDetails();
        details.setRecipient("pavankumarchalla111@gmail.com");
        details.setSubject("Status update");
        details.setMsgBody("your request has been accepted");
        String status
                = emailService.sendSimpleMail(details);

        return status;
    }



}

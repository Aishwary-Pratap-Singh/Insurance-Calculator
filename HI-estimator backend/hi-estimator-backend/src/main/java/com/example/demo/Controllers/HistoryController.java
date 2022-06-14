package com.example.demo.Controllers;
import com.example.demo.Models.History;
import com.example.demo.Models.InsurerPlans;
import com.example.demo.Models.User;
import com.example.demo.Repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = {"https://hi-estimator-frontend-urtjok3rza-el.a.run.app","http://localhost:4200"}, maxAge = 3600,exposedHeaders = "Access-Control-Allow-Origin")
@RestController
public class HistoryController {

    @Autowired
    HistoryRepository historyRepository;
    @GetMapping("get/allHistory")
    public List<History> findAllHistory(){
        return (List<History>) historyRepository.findAll();
    }


    @RequestMapping(value = "/getHistory/{emailid}",method = RequestMethod.GET)
    public List<History> getHistoryByEmailId(@PathVariable String emailid){
        return historyRepository.findAllHistoryByEmail(emailid);
    }


    @RequestMapping(value = "/getHistoryById/{id}",method = RequestMethod.GET)
    public History getHistoryById(@PathVariable Integer id){
        return historyRepository.findHistoryById(id);
    }

    @PostMapping(value = "/history/add")
    public History addHistory(@RequestBody History history){
        return historyRepository.save(history);
    }
}

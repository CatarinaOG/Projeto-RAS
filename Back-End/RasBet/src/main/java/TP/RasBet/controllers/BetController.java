package TP.RasBet.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import TP.RasBet.model.*;
import TP.RasBet.repositories.*;
import TP.RasBet.services.*;

@RestController
@RequestMapping(value = "api/bets")
public class BetController{

    @Autowired
    private BetRepo betRepo;

    @Autowired
    private AppService appService;
    
    @PostMapping(value = "/placeBet")
    public String placeBet(@RequestBody BetslipForm betslipForm){
        //JSONObject betslipForm = new JSONObject(req);
        return appService.placeBet(betslipForm);
    }


    @PostMapping(value = "/changeOdd")
    public String changeOdd(@RequestBody String req){//@RequestBody OddForm oddForm){
        JSONObject oddForm = new JSONObject(req);
        return appService.changeOdd(oddForm);
    }

    @PostMapping(value = "/insertOdd")
    public String insertOdd(@RequestBody String req){//@RequestBody OddForm oddForm){
        JSONObject oddForm = new JSONObject(req);
        return appService.insertOdd(oddForm);
    }
}
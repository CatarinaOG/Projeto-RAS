package TP.RasBet.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TP.RasBet.services.RestService;

@RestController
@RequestMapping(path="/api/stores")
public class ApiController {


    @Autowired
    private RestService restService;
    
    @GetMapping(value = "/")
    public String getGames(){
       // return restService.getGames();
        return "";
    }
    
} 

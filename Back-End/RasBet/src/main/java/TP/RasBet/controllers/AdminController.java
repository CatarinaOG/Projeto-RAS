package TP.RasBet.controllers;

import javax.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TP.RasBet.model.*;
import TP.RasBet.repositories.*;
import TP.RasBet.services.AppService;

@RestController
@RequestMapping(path = "/api/admin")
public class AdminController {

    @Autowired
    private AppService appService;
    
    @PostMapping(value="/login")
    public void login(@RequestBody LoginForm loginform){


        appService.teste(loginform.getEmail(), loginform.getPass());
        
    }

    @PostMapping(value="/register")
    public void register(@RequestBody RegisterForm registerForm){
        System.out.println(registerForm.getEmail()+ " " + " " + registerForm.getPassword());
    }

}

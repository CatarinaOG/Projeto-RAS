package TP.RasBet.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import TP.RasBet.model.*;
import TP.RasBet.services.AppService;
import TP.RasBet.services.UserService;


@RestController
@RequestMapping(path = "api/users")
public class UserController {
    
    @Autowired
    private UserService userService;

    @Autowired 
    private AppService appService;
    
    @PostMapping(value="/login")
    public String login(@RequestBody LoginForm loginform){

        String email = loginform.getEmail();
        String pass = loginform.getPass();


        String r = userService.login(email, pass);


        return r;

    }

 

    @PostMapping(value="/register")
    public String register(@RequestBody RegisterForm registerForm){
       
        return userService.register(registerForm);
        
    }

    @GetMapping(value="/bet_history")
    public String getBetHistory(@RequestBody String email){
        return userService.getBetHistory(email);
    }

}

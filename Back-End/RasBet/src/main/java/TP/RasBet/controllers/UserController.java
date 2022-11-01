package TP.RasBet.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import TP.RasBet.model.*;
import TP.RasBet.services.UserService;


@RestController
@RequestMapping(path = "api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping(value="/login")
    public String login(@RequestBody LoginForm loginform){

        String email = loginform.getEmail();
        String pass = loginform.getPass();

        return userService.login(email, pass);

    }

    @PostMapping(value="/register")
    public String register(@RequestBody RegisterForm registerForm){
       
        return userService.register(registerForm);
        
    }

}

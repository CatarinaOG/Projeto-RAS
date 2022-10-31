package TP.RasBet.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import TP.RasBet.model.*;


@RestController
@RequestMapping("api/users")
public class UserController {
    
    
    @PostMapping(value="/login")
    public void login(@RequestBody LoginForm loginform){
        System.out.println(loginform.getEmail());
        System.out.println(loginform.getPass());
    }

    @PostMapping(value="/register")
    public void register(@RequestBody RegisterForm registerForm){
        System.out.println(registerForm.getEmail()+ " " + " " + registerForm.getPassword());
    }

}

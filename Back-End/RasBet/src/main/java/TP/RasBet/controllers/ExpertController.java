package TP.RasBet.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import TP.RasBet.model.*;
import TP.RasBet.services.AppService;;


@RestController
@RequestMapping(path = "api/expert")
public class ExpertController {
    
    @Autowired
    private AppService appService;
    
    
    
    @PostMapping(value="login")
    public void login(@RequestBody LoginForm loginform){
        System.out.println(loginform.getEmail());

        System.out.println(loginform.getPass());
    }

    @PostMapping(value="/register")
    public void register(@RequestBody RegisterForm registerForm){
        System.out.println(registerForm.getEmail()+ " " + " " + registerForm.getPassword());
    }

    @GetMapping(value="/test")
    public void teste(){
        appService.getExpertGames();
    }
}

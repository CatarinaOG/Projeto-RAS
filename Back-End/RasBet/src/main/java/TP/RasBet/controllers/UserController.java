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

import java.security.Key;

import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.json.*;


@RestController
@RequestMapping(path = "api/users")
public class UserController {


    @Autowired
    private UserService userService;

    @Autowired 
    private AppService appService;

    @PostMapping(value="/teste")
    public void teste(@RequestBody String body){
        JSONObject b = new JSONObject(body);
        String input_string = (String) b.get("password");
        
        
        
    }


    @PostMapping(value="/login")
    public String login(@RequestBody String req){
        JSONObject loginForm = new JSONObject(req);
        String email = (String) loginForm.get("email");
        String pass = (String) loginForm.get("pass");
        return userService.login(email, pass);
    }

 

    @PostMapping(value="/register")
    public String register(@RequestBody String req){//@RequestBody RegisterForm registerForm){
        JSONObject registerForm = new JSONObject(req);
        return userService.register(registerForm);
    }

    @PostMapping(value="/bet_history")
    public String getBetHistory(@RequestBody String email){
        JSONObject j = new JSONObject(email);
        return userService.getBetHistory((String) j.get("email"));
    }

    @PostMapping(value = "/change_profile")
    public String changeProfile(@RequestBody String req){//@RequestBody ChangeProfileForm cpf){
        JSONObject cpf = new JSONObject(req);
        if(cpf.get("phone_num") == null && cpf.get("password") == null && cpf.get("new_add") == null){
            return userService.changeProfile(cpf);
        }
        else return userService.changeSensitive(cpf);
    }

    @PostMapping(value = "/get_code")
    public String getCode(@RequestBody String email){
        JSONObject j = new JSONObject(email);
        return userService.getCode((String) j.get("email_user"));
    }

    @PostMapping(value = "/transaction_history")
    public String getTransactionHistory(@RequestBody String email){
        JSONObject j = new JSONObject(email);
        return userService.getTransactionHistory((String) j.get("email"));
    }

    @PostMapping(value = "/winnings")
    public String getWinnings(@RequestBody String email){
        JSONObject j = new JSONObject(email);
        return userService.getWinnings((String) j.get("email"));
    }

    @PostMapping(value = "/recover_password")
    public String recoverPassword(@RequestBody String email_user){
        JSONObject j = new JSONObject(email_user);
        return userService.recoverPassword((String) j.get("email_user"));
    }

}

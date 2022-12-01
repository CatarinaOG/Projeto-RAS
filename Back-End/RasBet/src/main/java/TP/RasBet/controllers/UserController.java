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
import javax.crypto.spec.SecretKeySpec;

import org.json.*;


@RestController
@RequestMapping(path = "api/users")
public class UserController {
    private String secret = "AndreBrunoJoao";
    private SecretKey secretKey = new SecretKeySpec(secret.getBytes(), "AES");


    @Autowired
    private UserService userService;

    @Autowired 
    private AppService appService;

    @Autowired
    private Encrypt encrypt;

    @PostMapping(value="/teste")
    public void teste(@RequestBody String body){
       /*  JSONObject b = new JSONObject(body);
        try{
            String e = encrypt.encrypt((String) b.get("password"), secretKey);
            System.out.println("Encrypted: " + e);
            String d = encrypt.decrypt(e, secretKey);
            System.out.println("Decrypted: " + d);
        }catch(Exception e){
            System.out.println("Deu erro no Encrypt");
            System.out.println(e.getMessage());
        }
        */
    }






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

    @PostMapping(value="/bet_history")
    public String getBetHistory(@RequestBody String email){
        JSONObject j = new JSONObject(email);
        return userService.getBetHistory((String) j.get("email"));
    }

    @PostMapping(value = "/change_profile")
    public String changeProfile(@RequestBody ChangeProfileForm cpf){
        if(cpf.getPhone_num() == null && cpf.getPassword() == null && cpf.getNew_add() == null){
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

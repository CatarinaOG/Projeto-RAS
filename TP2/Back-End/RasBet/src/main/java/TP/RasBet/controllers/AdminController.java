package TP.RasBet.controllers;

import javax.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.json.*;
import TP.RasBet.model.*;
import TP.RasBet.repositories.*;
import TP.RasBet.services.AdminService;
import TP.RasBet.services.AppService;

@RestController
@RequestMapping(path = "/api/admin")
public class AdminController {

    @Autowired
    private AppService appService;

    @Autowired
    private AdminService adminService;



    @PostMapping(value = "/newExpert")
    public String newExpert(@RequestBody String req){
        JSONObject registerForm = new JSONObject(req);
        return adminService.createExpert(registerForm);
    }

    @PostMapping(value = "/removeExpert")
    public String deleteExpert(@RequestBody String id){
        JSONObject j = new JSONObject(id);
        return adminService.deleteExpert((int) j.get("id"));
    }

    @GetMapping(value = "/getExperts")
    public String getExperts(){
       return adminService.getExperts();
    }
}

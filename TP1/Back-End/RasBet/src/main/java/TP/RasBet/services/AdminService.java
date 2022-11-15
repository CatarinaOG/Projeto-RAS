package TP.RasBet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TP.RasBet.model.*;
import TP.RasBet.repositories.*;

@Service
public class AdminService{


    @Autowired
    private ExpertRepo expertRepo;

    @Autowired
    private AdminRepo adminRepo;

    public String createExpert(RegisterForm registerForm){
        Admin admin = adminRepo.findAll().get(0);
        Expert expert = new Expert(registerForm.getEmail(), registerForm.getPassword(), registerForm.getNome(), admin);

        if(!expertRepo.findExpertByEmail(registerForm.getEmail()).isPresent()){
            expertRepo.save(expert);
            return "{\"state\" : \"good\"}";
        }
        return "{\"state\" : \"bad\"}";
    }

    
}
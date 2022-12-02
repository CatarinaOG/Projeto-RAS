package TP.RasBet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import org.json.*;
import TP.RasBet.model.*;
import TP.RasBet.repositories.*;

@Service
public class AdminService implements IAdminService{


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


    public String deleteExpert(int id){
        if(expertRepo.findById(id).isPresent()){
            Expert e = expertRepo.findById(id).get();
            expertRepo.deleteById(id);

            return "{\"state\" : \"good\"}";
        }
        else{
            return "{\"state\" : \"bad\"}";
        }   
    }

    public String getExperts(){
        JSONArray response = new JSONArray();

        List<Expert> le = expertRepo.findAll();

        for(Expert e : le){
            JSONObject expert = new JSONObject();
            
            expert.put("id",e.getId());
            expert.put("user", e.getName());
            expert.put("email", e.getEmail());
            expert.put("password", e.getPassword());

            response.put(expert);
        }

        return response.toString();
    }
    
}
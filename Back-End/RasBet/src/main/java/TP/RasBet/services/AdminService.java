package TP.RasBet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import org.json.*;
import TP.RasBet.model.*;
import TP.RasBet.repositories.*;
import TP.RasBet.config.Logs;

@Service
public class AdminService implements IAdminService{


    @Autowired
    private ExpertRepo expertRepo;

    @Autowired
    private AdminRepo adminRepo;

    public String createExpert(JSONObject registerForm){
        Admin admin = adminRepo.findAll().get(0);
        Expert expert = new Expert((String) registerForm.get("email"), (String) registerForm.get("password"), (String) registerForm.get("nome"), admin);

        if(!expertRepo.findExpertByEmail((String)registerForm.get("email")).isPresent()){
            expertRepo.save(expert);
            return Logs.returnLogTrue();
        }
        return Logs.returnLogFalse();
    }


    public String deleteExpert(int id){
        if(expertRepo.findById(id).isPresent()){
            Expert e = expertRepo.findById(id).get();
            expertRepo.deleteById(id);

            return Logs.returnLogTrue();
        }
        else{
            return Logs.returnLogFalse();
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
package TP.RasBet.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import TP.RasBet.repositories.*;
import TP.RasBet.model.*;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ExpertRepo expertRepo;

    @Autowired
    private AdminRepo adminRepo;



    public String login(String email, String pass){


        Optional<User> findUserByEmail = userRepo.findUserByEmail(email);
        if(findUserByEmail.isPresent()){
            User user = findUserByEmail.get();

            if (user.getPassword().equals(pass)){
                return "{ \"username\" : "+ "\"" + user.getName()+ "\"" + ", \"type\" : \"apostador\", \"balance\" : " + user.getWallet() + "}";
            }  else return "{ \"username\" : null, \"type\" : null, \"balance\" : null"  + "}";
        }

        Optional<Expert> findExpertByEmail = expertRepo.findExpertByEmail(email);
        if(findExpertByEmail.isPresent()){
            Expert expert = findExpertByEmail.get();
            if (expert.getPassword().equals(pass)){
                return "{ \"username\" : " + "\"" + expert.getName() +  "\"" + ", \"type\" : \"especialista\"}";
            }  else return "{ \"username\" : null, \"type\" : null, \"balance\" : null}";
        }


        Optional<Admin> findAdminByEmail = adminRepo.findAdminByEmail(email);
        if(findAdminByEmail.isPresent()){
            Admin admin = findAdminByEmail.get();
            if (admin.getPassword().equals(pass)){
                return "{ \"username\" : " + "\""+ admin.getName() + "\""+ ", \"type\" : \"administrador\"}";
            }  else return "{ \"username\" : null, \"type\" : null, \"balance\" : null}";
        }

        return "{ \"username\" : null, \"type\" : null }";

    }


    public String register(RegisterForm rf){
        List<User> users = userRepo.findAll();
        String email = rf.getEmail();
        String cc  = rf.getCc();
        String nif = rf.getNif();
        for(User u : users){
            if(email.equals(u.getEmail()) || cc.equals(u.getCC()) || nif.equals(u.getNIF())){
                return "{ \"state\" : \"bad\"" + "}";
            }
        }

        User user = new User(rf.getEmail(), rf.getPassword(), rf.getTelefone(), rf.getNome(), rf.getMorada(), rf.getNif(), rf.getCc());
        userRepo.save(user);
        return "{ \"state\" : \"good\"" + "}";

    }


}
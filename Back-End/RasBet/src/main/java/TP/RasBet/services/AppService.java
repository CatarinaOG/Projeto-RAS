package TP.RasBet.services;

import TP.RasBet.model.*;
import TP.RasBet.repositories.*;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AppService {

    @Autowired 
    private AdminRepo adminRepo;

    @Autowired
    private ExpertRepo expertRepo;

    @Autowired
    private GameRepo gameRepo;


    public void teste(String email, String pass){
        
        Admin admin = new Admin();
        admin.setEmail("email");
        admin.setPassword("pass");
        admin.setName("ola");
        
        Expert expert = new Expert();
        expert.setEmail("email2");
        expert.setPassword("pass");
        expert.setName("nome2");
        expert.setAdmin(admin);

        adminRepo.save(admin);
        expertRepo.save(expert);
        
        Game game = new Game();

        game.setDate(new Date(2022-11-01));
        game.setSport("futebol");
        game.setState("acabado");
        game.setExpert(expert);

        gameRepo.save(game);

    }

    public void getExpertGames(){
        System.out.println( expertRepo.findById(10).get().toString());
        
    }

}
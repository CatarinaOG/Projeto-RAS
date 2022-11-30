package TP.RasBet.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TP.RasBet.model.*;
import TP.RasBet.repositories.*;

@Service
public class ExpertService{

    @Autowired
    private GameRepo gameRepo;

    @Autowired
    private ExpertRepo expertRepo;

    @Autowired
    private OddRepo oddRepo;

    public String createGame(GameForm gameForm){

        List<Game> games = gameRepo.findAll();

        String pA = gameForm.getParticipantA();
        String pB = gameForm.getParticipantB();
        Timestamp d = gameForm.getDate(); // DEPOIS ALTERAR

        String cmp = pA + ";" + pB;

        for(Game g : games){
            if(g.getParticipants().equals(cmp) && d.equals(g.getDate())){
                return "{\"state\" : \"bad\"}";
            } 
        }

        Odd oddA = new Odd(pA, gameForm.getOddA());
        Odd oddB = new Odd(pB, gameForm.getOddB());
        Odd oddTie = new Odd("Empate", gameForm.getOddTie());
        


        Expert expert = expertRepo.findExpertByEmail(gameForm.getExpert_email()).get();

        Game game = new Game(gameForm.getSport(), cmp, d, expert);
        gameRepo.save(game);
        oddA.setGame(game);
        oddB.setGame(game);
        oddTie.setGame(game);

        oddRepo.save(oddA);
        oddRepo.save(oddB);
        oddRepo.save(oddTie);
        

        return "{\"state\" : \"good\"}";


    }

    public String getGames(){


        return "";
    }


}
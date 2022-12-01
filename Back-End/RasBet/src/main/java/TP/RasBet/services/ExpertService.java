package TP.RasBet.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
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

        List<Expert> experts = expertRepo.findAll();

        JSONArray games = new JSONArray();

        for(Expert e : experts){
            for(Game g : e.getGames()){
                JSONObject game = new JSONObject();
                if(!g.getSport().equals("motoGP")){
                    game.put("id", g.getId());
                    game.put("sport", g.getSport());
                    game.put("away", g.getParticipants().split(";")[0]);
                    game.put("home", g.getParticipants().split(";")[1]);
                }
                else{
                    game.put("id", g.getId());
                    game.put("sport", g.getSport());
                    game.put("name", g.getParticipants()); // O que eles querem aqui é o nome do evento que ainda nao esta a ser guardado. 
                    JSONArray participants = new JSONArray();
                    String[] pts = g.getParticipants().split(";");
                    for(String s : pts){
                        JSONObject jo = new JSONObject();
                        jo.put("name", s);
                        participants.put(jo);
                    }
                    game.put("participants", participants);
                }
                games.put(game);
            }
        }


        return games.toString();
    }


}
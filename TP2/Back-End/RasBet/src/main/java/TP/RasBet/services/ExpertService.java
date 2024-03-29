package TP.RasBet.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TP.RasBet.model.*;
import TP.RasBet.repositories.*;

@Service
public class ExpertService implements IExpertService{

    @Autowired
    private GameRepo gameRepo;

    @Autowired
    private ExpertRepo expertRepo;

    @Autowired
    private OddRepo oddRepo;

    @Autowired
    private BetRepo betRepo;

    public String createGame(JSONObject event){

        List<Game> games = gameRepo.findAll();

        if(event.get("sport").equals("motoGP")){

            String participants = "";

            for(int i = 1; i <= 22; i++){
                if(i == 22) participants += (String) event.get("pilot" + i) ;
                else participants += (String) event.get("pilot" + i) + ";" ;
            }
            Timestamp d = Timestamp.valueOf((String) event.get("date")); // DEPOIS ALTERAR
            String name = (String) event.get("name");

            for(Game g : games){
                if(g.getParticipants().equals(participants) && d.equals(g.getDate())){
                    return "{\"state\" : \"bad\"}";
                }
            }
            
            Expert expert = expertRepo.findExpertByEmail((String) event.get("expert_email")).get();

            Game game = new Game((String) event.get("sport"), participants, d, expert, name, null);
            gameRepo.save(game);

            for(int i = 1; i <= 22; i++){
                Odd odd = new Odd((String) event.get("pilot"+i), Float.parseFloat(event.get("odd"+i).toString()));
                odd.setGame(game);
                oddRepo.save(odd);
            }

            return "{\"state\" : \"good\"}";
            
        }
        else{
            String pA = (String) event.get("participantA");
            String pB = (String) event.get("participantB");
            Timestamp d = Timestamp.valueOf((String) event.get("date")); // DEPOIS ALTERAR
            
            String name = (String) event.get("name");

            String cmp = pA + ";" + pB;

            for(Game g : games){
                if(g.getParticipants().equals(cmp) && d.equals(g.getDate())){
                    return "{\"state\" : \"bad\"}";
                }
            }

            Odd oddA = new Odd(pA, Float.parseFloat(event.get("oddA").toString()));
            Odd oddB = new Odd(pB, Float.parseFloat(event.get("oddB").toString()));
            Odd oddTie  = new Odd();
            if (event.get("sport").equals("futebol")){
                oddTie = new Odd("Empate", Float.parseFloat(event.get("oddTie").toString()));
            }
            

            Expert expert = expertRepo.findExpertByEmail((String) event.get("expert_email")).get();

            Game game = new Game((String) event.get("sport"), cmp, d, expert, name, null);
            gameRepo.save(game);
            oddA.setGame(game);
            oddB.setGame(game);
            if (event.get("sport").equals("futebol")) {
                oddTie.setGame(game);
                oddRepo.save(oddTie);
            }
            oddRepo.save(oddA);
            oddRepo.save(oddB);
            

            return "{\"state\" : \"good\"}";
        }
    }

    public String getGames(){

        List<Expert> experts = expertRepo.findAll().stream().filter(e -> !e.getEmail().equals("jogosAPI")).collect(Collectors.toList());

        JSONArray games = new JSONArray();

        for(Expert e : experts){
            for(Game g : e.getGames()){
                if(!g.getState().equals("Over")){
                    JSONObject game = new JSONObject();
                    if(!g.getSport().equals("motoGP")){
                        game.put("id", g.getId());
                        game.put("sport", g.getSport());
                        game.put("home", g.getParticipants().split(";")[0]);
                        game.put("away", g.getParticipants().split(";")[1]);
                    }
                    else{
                        game.put("id", g.getId());
                        game.put("sport", g.getSport());
                        game.put("name", g.getName());
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
        }
        return games.toString();
    }


    public void endGame(JSONObject games){

        int id = (int) games.get("idGame");
        Game g = gameRepo.findById(id).get();
        if(!games.has("nameParticipant")){
            int home = (int) games.get("home");
            int away = (int) games.get("away");
            g.setScore(home + "-" + away);
        }
        else{
            String nameParticipant = (String) games.get("nameParticipant");
            g.setScore(nameParticipant);
        }
        g.setState("Over");
        gameRepo.save(g);
        
    }

    public String changeBetState(JSONObject state){
        int id = (int) state.get("gameId");
        Game g = gameRepo.findById(id).get();
        if(g.getState().equals("TBD")) g.setState("Suspended");
        else if(g.getState().equals("Suspended")) g.setState("TBD");
        gameRepo.save(g);
        return "{\"confirmed\" : \"true\"}";
    }
}
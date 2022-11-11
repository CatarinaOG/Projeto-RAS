package TP.RasBet.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import TP.RasBet.model.*;
import TP.RasBet.repositories.*;

@Service
public class RestService {
    
    private final RestTemplate restTemplate;

    @Autowired
    private GameRepo gameRepo;

    @Autowired
    private ExpertRepo expertRepo;
    
    @Autowired
    private OddRepo oddRepo;

    

    public RestService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @Scheduled(fixedRate = 10000 )
    public void getGames() {
        String url = "http://ucras.di.uminho.pt/v1/Games";
        JSONArray jogos = new JSONArray(this.restTemplate.getForObject(url, String.class));
        boolean jogo_existe = false;
        List<Game> gamesDB = gameRepo.findAll();

        for(int i = 0; i < jogos.length(); i++){
            JSONObject j = (JSONObject) jogos.get(i);
            jogo_existe = false;
            
            Timestamp ts = Timestamp.from(Instant.parse((String) j.get("commenceTime")));

            for (Game g : gamesDB ){
                
                if(j.get("homeTeam").equals(g.getParticipantA()) 
                || j.get("awayTeam").equals(g.getParticipantB()) 
                || ts.equals(g.getDate()))
                    jogo_existe = true;
                
            }
            
            if(!jogo_existe){
                Game g = new Game("futebol", (String) j.get("homeTeam"), (String) j.get("awayTeam"), 
                                  ts, expertRepo.findExpertByEmail("jogosAPI").get());
                JSONArray bookmakersList = (JSONArray) j.get("bookmakers");
                JSONObject bookmaker = (JSONObject) bookmakersList.get(0);
                JSONArray marketsList = (JSONArray) bookmaker.get("markets");
                JSONObject market = (JSONObject) marketsList.get(0);
                JSONArray outcomes = (JSONArray) market.get("outcomes");

                
                JSONObject oddA = (JSONObject) outcomes.get(0);
                Odd oddAa = new Odd((String) oddA.get("name"), oddA.getFloat("price"));
                
                JSONObject oddB = (JSONObject) outcomes.get(1);
                Odd oddBb = new Odd((String) oddB.get("name"), oddB.getFloat("price"));

                JSONObject oddTie = (JSONObject) outcomes.get(2);
                Odd oddT = new Odd("Empate", oddTie.getFloat("price"));

                gameRepo.save(g);

                oddAa.setGame(g);
                oddBb.setGame(g);
                oddT.setGame(g);

                oddRepo.save(oddAa);
                oddRepo.save(oddBb);
                oddRepo.save(oddT);
            }
            
        }
        

    }

}
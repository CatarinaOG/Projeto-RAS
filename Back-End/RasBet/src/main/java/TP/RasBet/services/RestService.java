package TP.RasBet.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
public class RestService implements IRestService {
    
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
                
                if(j.get("homeTeam").equals(g.getParticipants().split(";")[0]) 
                || j.get("awayTeam").equals(g.getParticipants().split(";")[1]) 
                || ts.equals(g.getDate())){
                    jogo_existe = true;
                    if(j.get("scores") != g.getScore()){
                        g.getScore(j.get("scores")); //atualizar o resultado do jogo
                        g.setState("Over"); //fechar o jogo;
                        gameRepo.save(g);
                    }

                }
            }
            
            if(!jogo_existe){
                String participants = (String) j.get("homeTeam") + ";" + (String) j.get("awayTeam");

                Game g = new Game("futebol", participants, ts, expertRepo.findExpertByEmail("jogosAPI").get(), 
                                  participants.replace(";", " vs "), (String) j.get("scores"));
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


    @Scheduled(fixedRate = 10000 )
    public void getGamesNBA() {
        String api_key = "8408dcb136dde2d43436b699d2a107df";
        String sport_id = "basketball_nba";
        String format = "decimal";
        String url = "https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?regions=us&oddsFormat=decimal&apiKey=8408dcb136dde2d43436b699d2a107df";
        JSONArray jogos = new JSONArray(this.restTemplate.getForObject(url, String.class));
        boolean jogo_existe = false;
        List<Game> gamesDB = gameRepo.findAll();

        for(int i = 0; i < jogos.length(); i++){
            JSONObject j = (JSONObject) jogos.get(i);
            jogo_existe = false;
            
            Timestamp ts = Timestamp.from(Instant.parse((String) j.get("commence_time")));

            for (Game g : gamesDB ){
                
                if(j.get("home_team").equals(g.getParticipants().split(";")[0]) 
                || j.get("away_team").equals(g.getParticipants().split(";")[1]) 
                || ts.equals(g.getDate()))
                    jogo_existe = true;
                    if(j.get("scores") != g.getScore())
                        jogo_existe = false;
                
            }
            
            if(!jogo_existe){
                String participants = (String) j.get("home_team") + ";" + (String) j.get("away_team");

                Game g = new Game("futebol", participants, ts, expertRepo.findExpertByEmail("jogosAPI").get(), 
                                  participants.replace(";", " vs "), (String) j.get("scores"));
                JSONArray bookmakersList = (JSONArray) j.get("bookmakers");
                JSONObject bookmaker = (JSONObject) bookmakersList.get(0);
                JSONArray marketsList = (JSONArray) bookmaker.get("markets");
                JSONObject market = (JSONObject) marketsList.get(0);
                JSONArray outcomes = (JSONArray) market.get("outcomes");

                
                JSONObject oddA = (JSONObject) outcomes.get(0);
                Odd oddAa = new Odd((String) oddA.get("name"), oddA.getFloat("price"));
                
                JSONObject oddB = (JSONObject) outcomes.get(1);
                Odd oddBb = new Odd((String) oddB.get("name"), oddB.getFloat("price"));


                gameRepo.save(g);

                oddAa.setGame(g);
                oddBb.setGame(g);

                oddRepo.save(oddAa);
                oddRepo.save(oddBb);
            }
        }
    }










    //@Scheduled(fixedRate = 5000)
    public void getGamesNBA2(){
        LocalDate date = LocalDate.now();
        String api_key = "0e22c5619d734bd09b1bd5e0ae0ba858";
        String url = "https://api.sportsdata.io/v3/nba/odds/json/GameOddsByDate/"+ date + "?key=" + api_key;

        JSONArray games = new JSONArray(this.restTemplate.getForObject(url, String.class));

        boolean jogo_existe = false;
        List<Game> gamesDB = gameRepo.findAll();

        for (Object o : games){

            JSONObject g = (JSONObject) o;
            //
            
            Timestamp ts = Timestamp.from(Instant.parse((String) g.get("DateTime")+"Z"));
            LocalDateTime d = ts.toLocalDateTime().plusHours(4);
            ts = Timestamp.valueOf(d);
            for (Game j : gamesDB ){

                if(g.get("homeTeam").equals(j.getParticipants().split(";")[0]) 
                && g.get("awayTeam").equals(j.getParticipants().split(";")[1]) 
                && ts.equals(j.getDate()))
                    jogo_existe = true;

            }
            if(!jogo_existe){
                String participants = (String) g.get("HomeTeamName") + ";" + (String) g.get("AwayTeamName");

                Game j = new Game("basquetebol", participants, ts, expertRepo.findExpertByEmail("jogosAPI").get(), participants.replace(";", " vs "), (String) j.get("scores"));
                JSONArray bookmakersList = (JSONArray) g.get("PregameOdds");
                JSONObject bookmaker = (JSONObject) bookmakersList.get(0);
                Odd oddAa;
                Odd oddBb;
                
                Float awayPointSpread = Float.parseFloat(bookmaker.get("AwayPointSpread").toString());
                Float homePointSpread = Float.parseFloat(bookmaker.get("HomePointSpread").toString());
                
                
                if(awayPointSpread < 0){
                    oddAa = new Odd((String) g.get("HomeTeamName"), -awayPointSpread);
                }
                else {
                    oddAa = new Odd((String) g.get("HomeTeamName"), awayPointSpread);
                }
                if(homePointSpread < 0){
                    oddBb = new Odd((String) g.get("AwayTeamName"), -homePointSpread);
                }
                else{
                    oddBb = new Odd((String) g.get("AwayTeamName"), homePointSpread);
                }

                gameRepo.save(j);

                oddAa.setGame(j);
                oddBb.setGame(j);

                oddRepo.save(oddAa);
                oddRepo.save(oddBb);

            }
        }

    }

}

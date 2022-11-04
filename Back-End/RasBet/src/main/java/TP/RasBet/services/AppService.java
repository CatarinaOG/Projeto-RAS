package TP.RasBet.services;

import TP.RasBet.model.*;
import TP.RasBet.repositories.*;

import java.sql.Timestamp;
import java.sql.Date;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonComponentModule;
import org.springframework.stereotype.Service;
import org.json.JSONArray;
import org.json.JSONObject;


@Service
public class AppService {

    @Autowired 
    private AdminRepo adminRepo;

    @Autowired
    private ExpertRepo expertRepo;

    @Autowired
    private GameRepo gameRepo;

    @Autowired
    private OddRepo oddRepo;

    @Autowired
    private BetRepo betRepo;

    @Autowired 
    private UserRepo userRepo;


    @Autowired
    private UserService userService;

    @Autowired
    private GamesInOneBetRepo gamesInOneBetRepo;

    public JSONObject getGames(){
        List<Game> games = gameRepo.findAll();
        JSONArray jogos = new JSONArray();
        for(Game g : games){
            JSONArray odds = new JSONArray();
            JSONObject j = new JSONObject();
            

            for(Odd d : g.getOdds()){
                JSONObject odd = new JSONObject();
                odd.put("id", d.getId());
                odd.put("result",d.getDescription());
                odd.put("odd", d.getValue());
                odd.put("ammount", 0);
                odds.put(odd);
            }

            
            j.put("id", g.getId());
            j.put("home", g.getParticipantA());
            j.put("away", g.getParticipantB());
            j.put("date", g.getDate());
            j.put("results", odds);

            jogos.put(j);
        }

        JSONObject tmp = new JSONObject();
        tmp.put("games",jogos);

        return tmp;
    }

    public String placeBet(BetslipForm betslipForm){
        
        // obter todos os jogos relacionados com as Odds das bets
        List<BetForm> bets = betslipForm.getBets();
        List<Game> games = new ArrayList<>();
        float winnings = 1.0f;
        for(BetForm bf : bets){
            Odd odd = oddRepo.findById(bf.getId()).get();
            games.add(odd.getGame());
            winnings *= odd.getValue();
        }

        if(games.size() != games.stream().distinct().count()){
            return "{\"confirmed\" : \"false\"}";
        }

        if(userRepo.findUserByEmail(betslipForm.getUser()).get().getWallet() < betslipForm.getMultipleAmount()){
            return "{\"confirmed\" : \"false\"}";
        }

        User u = userRepo.findUserByEmail(betslipForm.getUser()).get();
        u.setWallet(u.getWallet()-betslipForm.getMultipleAmount());

        Bet b = new Bet(betslipForm.getMultipleAmount(), winnings, Timestamp.from(Instant.now()), u);
        
        betRepo.save(b);

        //criar GamesInOneBet 
        
        for (BetForm bf : bets){
            Odd o = oddRepo.findById(bf.getId()).get();
            GamesInOneBet giob = new GamesInOneBet(o.getValue());
            giob.setBet(b);
            giob.setGame(o.getGame());
            gamesInOneBetRepo.save(giob);
        }
        
        //  Adicionar o jogo 
        //  Adicionar a Bet correspondente

        return "{\"confirmed\" : \"true\"}";
    }


    public String changeOdd(OddForm oddForm){
        
        if (!oddRepo.findById(oddForm.getId()).isPresent()){
            return "{\"confirmed\" : \"false\"}";
        }

        Odd o = oddRepo.findById(oddForm.getId()).get();
        o.setValue(oddForm.getOdd());
        oddRepo.save(o);

        return "{\"confirmed\" : \"true\"}";
    }

    public String insertOdd(OddForm oddForm){
        
        if (!oddRepo.findById(oddForm.getId()).isPresent()){
            Odd o = oddRepo.findById(oddForm.getId()).get();
            o.setValue(oddForm.getOdd());
            oddRepo.save(o);
            return "{\"confirmed\" : \"true\"}";
        }

        return "{\"confirmed\" : \"false\"}";
    }



    public String getGamesFiltered(String participant){
        if(gameRepo.findGameByParticipant(participant).isPresent()){
            JSONObject response = new JSONObject();
            JSONArray gamesResponse = new JSONArray();
            List<Game> games = gameRepo.findGameByParticipant(participant).get();

            for(Game g : games){
                JSONObject j = new JSONObject();
                j.put("id", g.getId());
                j.put("home", g.getParticipantA());
                j.put("away", g.getParticipantB());
                j.put("date", g.getDate());
                JSONArray results = new JSONArray();

                for(Odd o : g.getOdds()){
                    JSONObject odd = new JSONObject();
                    odd.put("id", o.getId());
                    odd.put("result", o.getDescription());
                    odd.put("odd", o.getValue());
                    odd.put("amount", 0);
                    results.put(o);
                }
                j.put("results", results);
                gamesResponse.put(j);
            }
            response.put("games", gamesResponse);
            return response.toString();
        }
        else{
            return "{\"games\" : null";
        }
    }


}
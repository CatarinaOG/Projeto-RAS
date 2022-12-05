package TP.RasBet.services;

import TP.RasBet.model.*;
import TP.RasBet.repositories.*;

import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.sql.Date;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonComponentModule;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.json.JSONArray;
import org.json.JSONObject;


@Service
public class AppService implements IAppService {

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
    private IUserService userService;

    @Autowired EmailSenderService emailSenderService;

    @Autowired
    private GamesInOneBetRepo gamesInOneBetRepo;

    public JSONObject getGames(){
        List<Game> games = gameRepo.findAll();
        JSONArray jogos = new JSONArray();
        for(Game g : games){
            if(!g.getState().equals("Over")){
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

                j.put("sport", g.getSport());
                if (g.getSport().equals("motoGP")){
                    j.put("name",g.getName());
                }
                else{
                    j.put("home", g.getParticipants().split(";")[0]);
                    j.put("away", g.getParticipants().split(";")[1]);
                }

                j.put("id", g.getId());
                j.put("date", g.getDate());
                j.put("results", odds);

                if(g.getState().equals("Suspended")){
                    j.put("active", "false");
                }
                else j.put("active", "true");


                jogos.put(j);
            }
            
        }

        JSONObject tmp = new JSONObject();
        tmp.put("games",jogos);

        return tmp;
    }

    public String placeBet(JSONObject betslipForm){//BetslipForm betslipForm){
        
        // obter todos os jogos relacionados com as Odds das bets
        //List<BetForm> bets = betslipForm.getBets();
        JSONArray bets = (JSONArray) betslipForm.get("bets");
        List<Game> games = new ArrayList<>();
        float winnings = 1.0f;
        List<Bet> betList = new ArrayList<>();
        List<Odd> oddList = new ArrayList<>();

        if(((String) betslipForm.get("type")).equals("multiple")){

            for(int i = 0; i < bets.length(); i++){
                Odd odd = oddRepo.findById((int) bets.getJSONObject(i).get("id")).get();
                games.add(odd.getGame());
                winnings *= odd.getValue();
            }
    
            int aux = (int) (winnings*100);
            winnings = aux/100f; 

            float amount = Float.parseFloat(betslipForm.get("multipleAmount").toString());

            if(games.size() != games.stream().distinct().count()){
                return "{\"confirmed\" : \"1\"}";
            }
    
            if(userRepo.findUserByEmail((String) betslipForm.get("user")).get().getWallet() < amount){
                return "{\"confirmed\" : \"2\"}";
            }
    

            User u = userRepo.findUserByEmail((String) betslipForm.get("user")).get();
            u.setWallet(u.getWallet() - amount);
    
            Bet b = new Bet(amount, winnings * amount, Timestamp.from(Instant.now()), u, "Open", u.getWallet());
            
            betRepo.save(b);
    
            //criar GamesInOneBet 
            
            for(int i = 0; i < bets.length(); i++){
                Odd o = oddRepo.findById((int) bets.getJSONObject(i).get("id")).get();
                GamesInOneBet giob = new GamesInOneBet(o.getValue(), o.getDescription());
                giob.setBet(b);
                giob.setGame(o.getGame());
                gamesInOneBetRepo.save(giob);
            }
            userRepo.save(u);
            
            return "{\"confirmed\" : \"true\"}";
        }
        else{

            float totalAmount = 0.0f;
            User u = userRepo.findUserByEmail((String) betslipForm.get("user")).get();
            for(int i = 0; i < bets.length(); i++){
                float amount = Float.parseFloat(bets.getJSONObject(i).get("amount").toString());
                Odd odd = oddRepo.findById((int) bets.getJSONObject(i).get("id")).get();
                games.add(odd.getGame());
                totalAmount += amount;
                Bet b = new Bet(amount, odd.getValue()*amount, Timestamp.from(Instant.now()), u, "Open", u.getWallet() - totalAmount);
                betList.add(b);
                oddList.add(odd);
            }
    
            if(userRepo.findUserByEmail((String) betslipForm.get("user")).get().getWallet() < totalAmount){
                return "{\"confirmed\" : \"2\"}";
            }

            u.setWallet(u.getWallet() - totalAmount);

            for(int i = 0; i < betList.size(); i++){
                Bet b = betList.get(i);
                Odd o = oddList.get(i);

                betRepo.save(b);
                GamesInOneBet giob = new GamesInOneBet(o.getValue(), o.getDescription());
                giob.setBet(b);
                giob.setGame(o.getGame());
                gamesInOneBetRepo.save(giob);
            }
            userRepo.save(u);
            
            return "{\"confirmed\" : \"true\"}";
        }
    }


    public String changeOdd(JSONObject oddForm){//OddForm oddForm){
        
        if (!oddRepo.findById(Integer.parseInt(oddForm.get("id").toString())).isPresent()){
            return "{\"confirmed\" : \"false\"}";
        }

        Odd o = oddRepo.findById(Integer.parseInt(oddForm.get("id").toString())).get();
        o.setValue(Float.parseFloat(oddForm.get("odd").toString()));
        oddRepo.save(o);

        return "{\"confirmed\" : \"true\"}";
    }

    public String insertOdd(JSONObject oddForm){//OddForm oddForm){
        
        if (!oddRepo.findById(Integer.parseInt(oddForm.get("id").toString())).isPresent()){
            Odd o = oddRepo.findById(Integer.parseInt(oddForm.get("id").toString())).get();
            o.setValue(Float.parseFloat(oddForm.get("odd").toString()));
            oddRepo.save(o);
            return "{\"confirmed\" : \"true\"}";
        }

        return "{\"confirmed\" : \"false\"}";
    }



    public String getGamesFiltered(String participant){
        JSONObject participantjson = new JSONObject(participant);
        String p = (String) participantjson.get("filter");
        if(!gameRepo.findGameByParticipant(p).isEmpty()){
            
            JSONObject response = new JSONObject();
            JSONArray gamesResponse = new JSONArray();
            List<Game> games = gameRepo.findGameByParticipant(p);
            // System.out.println(games);

            for(Game g : games){
                gamesResponse.put(g.getId());
                /*
                JSONObject j = new JSONObject();
                j.put("id", g.getId());
                j.put("home", g.getParticipants().split(";")[0]);
                j.put("away", g.getParticipants().split(";")[1]);
                j.put("date", g.getDate());
                JSONArray results = new JSONArray();

                for(Odd o : g.getOdds()){
                    JSONObject odd = new JSONObject();
                    odd.put("id", o.getId());
                    odd.put("result", o.getDescription());
                    odd.put("odd", o.getValue());
                    odd.put("amount", 0);
                    results.put(odd);
                }
                j.put("results", results);
                gamesResponse.put(j);
                */
            }
            response.put("games", gamesResponse);
            return response.toString();
        }
        else{
            return "{\"games\" : null }";
        }
    }


    @Scheduled(fixedRate = 10000)
    public void updateStatus() {

        List<Game> games = gameRepo.findAll();

        for(Game g : games){
            if(g.getState().equals("TBD"))
                if(g.getDate().toLocalDateTime().isBefore(LocalDateTime.now())){
                    g.setState("Suspended");
                    gameRepo.save(g);
                }

        }

        List<Bet> bets = betRepo.findAll();
        for(Bet b : bets){
            List<GamesInOneBet> gamesInBet = b.getGames();
            boolean flag = true;
            for(GamesInOneBet giob : gamesInBet){
                if(giob.getGame().getState().equals("TBD") || giob.getGame().getScore() == null) {
                    flag = false;
                    break;
                }
            }
            if(flag && !b.getState().equals("Closed")){
                b.setState("Closed");
                b.setResult(true);
                //verificar se as apostas ganharam todas
                if(check_results(gamesInBet)){
                    //emailSenderService.sendSimpleEmail(b.getUser().getEmail(), "Your bet has been closed. You won" + b.getWinnings(), "Bet closed");
                    User u = b.getUser();
                    u.setWallet(u.getWallet() + b.getWinnings());
                    userRepo.save(u);
                }
                else{
                    //emailSenderService.sendSimpleEmail(b.getUser().getEmail(), "Your bet has been closed. You lost!", "Bet closed");
                    b.setWinnings(0);
                } 
                betRepo.save(b);
            }
        }  
    }


    private boolean check_results(List<GamesInOneBet> giob){
        
        // se for futebol ou basket, é preciso verificar o resultado, ver qual das equipas ganhou ou se houve empate

        // se for motoGP ou ténis basta verificar em quem é que foi a aposta e ver o result, que terá o nome do vencedor da corrida/jogo
        for(GamesInOneBet g : giob){
            if(g.getGame().getSport().equals("motoGP") || g.getGame().getSport().equals("tennis")){
                String bet_res = g.getDescription();
                String res = g.getGame().getScore();
                if(!bet_res.equals(res)) return false;
            }
            else{
                Game game = g.getGame();
                String bet_res = g.getDescription();
                String home_res = game.getScore().split("-")[0];
                String away_res = game.getScore().split("-")[1];
                
                if (Integer.parseInt(home_res) > Integer.parseInt(away_res) && 
                   (bet_res.equals(game.getParticipants().split(";")[1]) || bet_res.equals("Draw")) ){
                    return false;
                }
                if (Integer.parseInt(away_res) > Integer.parseInt(home_res) && 
                   (bet_res.equals(game.getParticipants().split(";")[0]) || bet_res.equals("Draw"))){
                    return false;
                }
                if (Integer.parseInt(home_res) == Integer.parseInt(away_res) && (!bet_res.equals("Draw"))){
                    return false;
                }
            }
        }
        return true;
    }

}
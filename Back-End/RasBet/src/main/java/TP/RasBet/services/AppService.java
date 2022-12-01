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

    @Autowired EmailSenderService emailSenderService;

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
            j.put("home", g.getParticipants().split(";")[0]);
            j.put("away", g.getParticipants().split(";")[1]);
            j.put("date", g.getDate());
            j.put("results", odds);
            if(g.getState().equals("TBD")){
                j.put("active", "false");
            }
            else j.put("active", "true");
            j.put("sport", g.getSport());

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

        int aux = (int) (winnings*100);
        winnings = aux/100f; 

        if(games.size() != games.stream().distinct().count()){
            return "{\"confirmed\" : \"false\"}";
        }

        if(userRepo.findUserByEmail(betslipForm.getUser()).get().getWallet() < betslipForm.getMultipleAmount()){
            return "{\"confirmed\" : \"false\"}";
        }

        User u = userRepo.findUserByEmail(betslipForm.getUser()).get();
        u.setWallet(u.getWallet()-betslipForm.getMultipleAmount());

        Bet b = new Bet(betslipForm.getMultipleAmount(), winnings*betslipForm.getMultipleAmount(), Timestamp.from(Instant.now()), u, "Open", u.getWallet());
        
        betRepo.save(b);

        //criar GamesInOneBet 
        
        for (BetForm bf : bets){
            Odd o = oddRepo.findById(bf.getId()).get();
            GamesInOneBet giob = new GamesInOneBet(o.getValue(), o.getDescription());
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
        JSONObject participantjson = new JSONObject(participant);
        String p = (String) participantjson.get("filter");
        if(!gameRepo.findGameByParticipant(p).isEmpty()){
            
            JSONObject response = new JSONObject();
            JSONArray gamesResponse = new JSONArray();
            List<Game> games = gameRepo.findGameByParticipant(p);
            System.out.println(games);

            for(Game g : games){
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
            }
            
            response.put("games", gamesResponse);
            return response.toString();
        }
        else{
            return "{\"games\" : null }";
        }
    }


    //@Scheduled(fixedRate = 10000)
    public void updateStatus() {

        List<Game> games = gameRepo.findAll();

        for(Game g : games){
            if(!g.getState().equals("Over"))
                if(g.getDate().toLocalDateTime().isBefore(LocalDateTime.now()))
                    g.setState("Over");
        }

        List<Bet> bets = betRepo.findAll();
        for(Bet b : bets){
            List<GamesInOneBet> gamesInBet = b.getGames();
            boolean flag = true;
            for(GamesInOneBet giob : gamesInBet){
                if(giob.getGame().getState().equals("TBD") || giob.getGame().getScore().equals("null"))
                    flag = false;
                    break;
            }
            if(flag){
                b.setState("Closed");
                //verificar se as apostas ganharam todas
                if(check_results(gamesInBet)){
                    emailSenderService.sendSimpleEmail(b.getUser().getEmail(), "Your bet has been closed. You won" + b.getWinnings(), "Bet closed");
                    User u = b.getUser();
                    u.setWallet(u.getWallet() + b.getWinnings());
                    userRepo.save(u);
                }
                else{
                    emailSenderService.sendSimpleEmail(b.getUser().getEmail(), "Your bet has been closed. You lost!", "Bet closed");
                } 
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
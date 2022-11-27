package TP.RasBet.services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.json.*;
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

    @Autowired
    private BetRepo betRepo;


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

        User user = new User(rf.getEmail(), rf.getPassword(), rf.getTelefone(), rf.getNome(), rf.getMorada(), rf.getNif(), rf.getCc(),rf.getDataDeNascimento());
        

        LocalDate ld = rf.getDataDeNascimento().toLocalDateTime().toLocalDate();
        ld = ld.plusYears(18);
        LocalDate now = LocalDate.now();

        System.out.println("Data de nascimento + 18 anos: " + ld);
        System.out.println("Data de hoje: " + now);

        if (ld.isAfter(now)){
            return "{ \"state\" : \"bad\"" + "}";
        }

        userRepo.save(user);
        return "{ \"state\" : \"good\"" + "}";

    }


    public String getBetHistory(String email){

        if(!userRepo.findUserByEmail(email).isPresent()){ //se o utilizador não tiver apostas feitas
            return "\"bet_History\" : []";
        }

        User u = userRepo.findUserByEmail(email).get();
        
        List<Bet> betList = u.getBets();

        JSONObject response = new JSONObject(); // json de fora

        JSONArray betHistory = new JSONArray(); //JSONArray que contém as bets todas

        for(Bet b : betList){

            LocalDate dataAposta = b.getDate().toLocalDateTime().toLocalDate();
            LocalDate threeMonthsBack = LocalDate.now().minusMonths(3);

            if(dataAposta.isAfter(threeMonthsBack)){ // se a aposta foi feita há menos de 3 meses

                JSONObject bet = new JSONObject(); // JSONObect que contém uma bet
                JSONArray games = new JSONArray(); // JSONArray que contém todas as bets de uma múltipla ou a bet de uma simples

                //lista de jogos na aposta
                List<GamesInOneBet> g = b.getGames(); //lista de objetos que relaciona uma bet com os seus jogos

                for(GamesInOneBet giob : g){
                    JSONObject gameInfo = new JSONObject(); // JSONObject que contém informação sobre o jogo
                    gameInfo.put("type", giob.getGame().getSport()); //eles querem "type : team" e não o sport                     -- WARNING! --
                    String name = giob.getGame().getParticipants().replace(";", " vs "); //verificar como é que eles querem        -- WARNING! --
                    gameInfo.put("name", name);
                    gameInfo.put("winner", giob.getDescription()); //vamos ter de guardar na bet ou no jogo o vencedor         -- WARNING! --

                    games.put(gameInfo);
                }

                bet.put("bet", games);
                bet.put("amount", b.getAmount());
                bet.put("winnings", b.getWinnings());

                betHistory.put(bet);
            }
        }

        response.put("betHistory", betHistory);

        return response.toString();
    }

    public String changeProfile(ChangeProfileForm cpf){
        String email = cpf.getEmail_user();

        User u = userRepo.findUserByEmail(email).get();
        u.setName(cpf.getName());
        userRepo.save(u);


        return "{\"state\" : \"good\"}";
    }

    public String getTransactionHistory(String email){
        User u = userRepo.findUserByEmail(email).get();
    
        List<Transaction> transactions = u.getTransactions();

        JSONObject response = new JSONObject();

        JSONArray ts = new JSONArray();
        for(Transaction t : transactions){
            JSONObject tr = new JSONObject();

            tr.put("date", t.getDate());
            if(t.getDescription().equals("Withdraw")){
                tr.put("description", "Levantamento");  
                tr.put("operation", "-" + t.getAmount());
            }
            else{
                tr.put("description", "Deposito");
                tr.put("operation", "+" + t.getAmount());
            }
            tr.put("balance", t.getFinalBalance());

            ts.put(tr);
        }

        //bets como transações

        List<Bet> bets = u.getBets();

        for(Bet b : bets){
            JSONObject betObj = new JSONObject();

            //primeiro colocar a aposta em si

            betObj.put("date", b.getDate());
            betObj.put("description", "aposta");
            betObj.put("operation", "-" + b.getAmount());

            ts.put(betObj);

            //depois, se a aposta já acabou e tiver sido ganha, então vamos colocar os winnings também 

            if(b.getState().equals("Terminada") && b.getResult() == true){
                JSONObject winObj = new JSONObject();

                winObj.put("date", b.getDate());
                winObj.put("description", "ganho de aposta");
                winObj.put("operation", "+" + b.getWinnings());

                ts.put(winObj);
            }

        }

        response.put("transactions",ts);
    
        return response.toString();
    }


    public String getWinnings(String email){
        User u = userRepo.findUserByEmail(email).get();

        List<Bet> betList = u.getBets();

        float total = 0;
        float gasto = 0;
        float ganho = 0;
        for(Bet b : betList){
            if(b.getState().equals("Terminada")){
                
                gasto -= b.getAmount();
                if(b.getResult()) ganho += b.getWinnings();

            }
        }
        total = gasto + ganho;

        JSONObject response = new JSONObject();

        response.put("gasto", gasto);
        response.put("ganho", ganho);
        response.put("total", total);

        return response.toString();
    }

    
    public String recoverPassword(String email){
        
        Optional<User> u = userRepo.findUserByEmail(email);

        if(u.isPresent()){
            String password = u.get().getPassword();
            //enviar email para o email acima com a password do utilizador
            return "{ \"status\" : \"true\" }";
        }

        Optional<Expert> e = expertRepo.findExpertByEmail(email);

        if(e.isPresent()){    
            String password = e.get().getPassword();
            //enviar email para o email acima com a password do utilizador
            return "{ \"status\" : \"true\"}";
        }

        return "{ \"status\" : \"false\" }";

    }


}
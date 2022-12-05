package TP.RasBet.services;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;

import org.json.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import TP.RasBet.repositories.*;
import TP.RasBet.model.*;

@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ExpertRepo expertRepo;

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private BetRepo betRepo;

    @Autowired
    private EmailSenderService mailService;

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


    public String register(JSONObject rf){//RegisterForm rf){
        List<User> users = userRepo.findAll();
        String email = (String) rf.get("email");
        String cc  = (String) rf.get("cc");
        String nif = (String) rf.get("nif");
        for(User u : users){
            if(email.equals(u.getEmail()) || cc.equals(u.getCC()) || nif.equals(u.getNIF())){
                return "{ \"state\" : \"bad\"" + "}";
            }
        }

        Timestamp dn = Timestamp.valueOf((String) rf.get("data_de_nascimento"));

        String password = (String) rf.get("password");

        User user = new User(email, password, (String) rf.get("telefone"), (String) rf.get("nome"), 
                            (String) rf.get("morada"), (String) rf.get("nif"), (String) rf.get("cc"), dn);

        LocalDate ld = dn.toLocalDateTime().toLocalDate();
        ld = ld.plusYears(18);
        LocalDate now = LocalDate.now();

        //System.out.println("Data de nascimento + 18 anos: " + ld);
        //System.out.println("Data de hoje: " + now);

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

        float win = 0.0f, loss = 0.0f;

        for(Bet b : betList){

            LocalDate dataAposta = b.getDate().toLocalDateTime().toLocalDate();
            LocalDate threeMonthsBack = LocalDate.now().minusMonths(3);

            if(b.getState().equals("Terminada") && b.getResult()){
                win += b.getWinnings();
            }
            loss -= b.getAmount();

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
                    gameInfo.put("winner", giob.getDescription()); //vamos ter de guardar na bet ou no jogo o vencedor             -- WARNING! --

                    games.put(gameInfo);
                }

                bet.put("bet", games);
                bet.put("amount", b.getAmount());
                if(b.getState().equals("Closed")) bet.put("winnings", b.getWinnings());
                else bet.put("winnings", -1);

                betHistory.put(bet);
            }
        }

        response.put("betHistory", betHistory);
        response.put("total_win", win);
        response.put("total_bet", loss);

        return response.toString();
    }

    public String changeProfile(JSONObject cpf){//ChangeProfileForm cpf){
        String email = (String) cpf.get("email_user");
        User u = userRepo.findUserByEmail(email).get();
        u.setName((String) cpf.get("name"));
        userRepo.save(u);

        return "{\"state\" : \"good\"}";
    }

    public String changeSensitive(JSONObject cpf){//ChangeProfileForm cpf){
        String email = (String) cpf.get("email_user");
        User u = userRepo.findUserByEmail(email).get();

        if(!u.getAddress().equals("")){
            u.setAddress((String) cpf.get("new_add"));
        }
        if(!u.getPassword().equals("")){
            u.setPassword((String) cpf.get("password"));
        }
        if(!u.getPassword().equals("")){
            u.setPhone((String) cpf.get("phone_num"));
        }

        userRepo.save(u);

        return "{\"state\" : \"good\"}";
    }

    public String getCode(String email){
        JSONObject response = new JSONObject();
        UUID uuid = UUID.randomUUID();
        response.put("code", uuid);

        mailService.sendSimpleEmail(email, "Insert this code to change your sensitive personal information: " + uuid, "Change Personal Information Code");

        return response.toString();
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
            betObj.put("description", "Aposta");
            betObj.put("operation", "-" + b.getAmount());
            betObj.put("balance", b.getFinal_balance());
            ts.put(betObj);

            //depois, se a aposta já acabou e tiver sido ganha, então vamos colocar os winnings também 

            if(b.getState().equals("Closed") && b.getResult() == true){
                JSONObject winObj = new JSONObject();

                winObj.put("date", b.getDate());
                winObj.put("description", "ganho de aposta");
                winObj.put("operation", "+" + b.getWinnings());
                winObj.put("balance", b.getFinal_balance());

                ts.put(winObj);
            }

        }

        response.put("transactions", ts);
    
        return response.toString();
    }

    
    public String recoverPassword(String email){
        
        Optional<User> u = userRepo.findUserByEmail(email);

        if(u.isPresent()){
            String password = u.get().getPassword();
            //enviar email para o email acima com a password do utilizador
            mailService.sendSimpleEmail(u.get().getEmail(), "This is your password: " + password, "Password recovery");
            return "{ \"status\" : \"true\" }";
        }

        Optional<Expert> e = expertRepo.findExpertByEmail(email);

        if(e.isPresent()){    
            String password = e.get().getPassword();
            //enviar email para o email acima com a password do utilizador
            mailService.sendSimpleEmail(e.get().getEmail(), "This is your password: " + password, "Password recovery");
            return "{ \"status\" : \"true\"}";
        }

        return "{ \"status\" : \"false\" }";

    }


}
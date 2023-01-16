package TP.RasBet.services;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;

import org.json.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import TP.RasBet.repositories.*;
import TP.RasBet.model.*;
import TP.RasBet.config.Logs;

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
    private GameRepo gameRepo;

    @Autowired
    private User_follows_game_Repo user_follows_game_Repo;

    @Autowired
    private EmailSenderService mailService;


    public String login(String email, String pass){

        Optional<User> findUserByEmail = userRepo.findUserByEmail(email);
        if(findUserByEmail.isPresent()){
            User user = findUserByEmail.get();
            if (user.getPassword().equals(pass))
                return Logs.buildJSON("username", user.getName(), "type", "apostador", "balance", user.getWallet());
            else
                return Logs.buildJSON("username", "null", "type", "null", "balance", "null");
        }

        Optional<Expert> findExpertByEmail = expertRepo.findExpertByEmail(email);
        if(findExpertByEmail.isPresent()){
            Expert expert = findExpertByEmail.get();
            if (expert.getPassword().equals(pass))
                return Logs.buildJSON("username", expert.getName(), "type", "especialista");
            else 
                return Logs.buildJSON("username", "null", "type", "null", "balance", "null");
        }

        Optional<Admin> findAdminByEmail = adminRepo.findAdminByEmail(email);
        if(findAdminByEmail.isPresent()){
            Admin admin = findAdminByEmail.get();
            if (admin.getPassword().equals(pass))
                return Logs.buildJSON("username", admin.getName(), "type", "administrador");
            else 
                return Logs.buildJSON("username", "null", "type", "null", "balance", "null");
        }

        return Logs.buildJSON("username", "null", "type", "null");

    }

    public boolean checkAge(Timestamp data_nascimento){
        boolean response = false;
        LocalDate ld = data_nascimento.toLocalDateTime().toLocalDate();
        ld = ld.plusYears(18);
        LocalDate now = LocalDate.now();

        if (ld.isAfter(now)){
            response = true;
        }
        
        return response;
    }


    public String register(JSONObject rf){
        List<User> users = userRepo.findAll();
        String email = (String) rf.get("email");
        String cc  = (String) rf.get("cc");
        String nif = (String) rf.get("nif");
        for(User u : users){
            if(email.equals(u.getEmail()) || cc.equals(u.getCC()) || nif.equals(u.getNIF())){
                return Logs.returnLogFalse();
            }
        }
        Timestamp dn = Timestamp.valueOf((String) rf.get("data_de_nascimento"));

        String password = (String) rf.get("password");

        User user = new User(email, password, (String) rf.get("telefone"), (String) rf.get("nome"), 
                            (String) rf.get("morada"), (String) rf.get("nif"), (String) rf.get("cc"), dn);


        if (checkAge(dn)){
            userRepo.save(user);
            return Logs.returnLogTrue();
        }
        return Logs.returnLogTrue();

    }


    private JSONObject buildBet(Bet b){
        JSONObject bet = new JSONObject(); // JSONObect que contém uma bet
        JSONArray games = new JSONArray(); // JSONArray que contém todas as bets de uma múltipla ou a bet de uma simples

        //lista de jogos na aposta
        List<GamesInOneBet> g = b.getGames(); //lista de objetos que relaciona uma bet com os seus jogos

        for(GamesInOneBet giob : g){
            JSONObject gameInfo = new JSONObject(); // JSONObject que contém informação sobre o jogo
            gameInfo.put("type", giob.getGame().getSport());
            String name = giob.getGame().getParticipants().replace(";", " vs ");
            gameInfo.put("name", name);
            gameInfo.put("winner", giob.getDescription());

            games.put(gameInfo);
        }

        bet.put("bet", games);
        bet.put("amount", b.getAmount());
        if(b.getState().equals("Closed")) bet.put("winnings", b.getWinnings());
        else bet.put("winnings", -1);
        return bet;
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

            if (b.getState().equals("Closed") && b.getResult()) win += b.getWinnings();
            loss -= b.getAmount();

            if(dataAposta.isAfter(threeMonthsBack)){ // se a aposta foi feita há menos de 3 meses

                betHistory.put(buildBet(b));
            
            }
        }

        response.put("betHistory", betHistory);
        response.put("total_win", win);
        response.put("total_bet", loss);
        response.put("balance", u.getWallet());

        return response.toString();
    }

    public String changeProfile(JSONObject cpf){//ChangeProfileForm cpf){
        String email = (String) cpf.get("email_user");
        User u = userRepo.findUserByEmail(email).get();
        u.setName((String) cpf.get("name"));
        userRepo.save(u);

        return Logs.returnLogTrue();
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

        return Logs.returnLogTrue();
    }

    public String getCode(String email){
        JSONObject response = new JSONObject();
        UUID uuid = UUID.randomUUID();
        response.put("code", uuid);
        mailService.sensitiveInfoCode(email, uuid);
        return response.toString();
    }


    public JSONArray getUserTransactions(User u, JSONArray transactionsJsonList){
        List<Transaction> transactions = u.getTransactions();
        JSONObject response = new JSONObject();
        
        for(Transaction t : transactions){
            JSONObject tr = new JSONObject();

            tr.put("date",t.getDate());
            if(t.getDescription().equals("Withdraw")){
                tr.put("description","Levantamento");
                tr.put("operation","-"+t.getAmount());
            }
            else{
                tr.put("description","Deposito");
                tr.put("operation","+"+t.getAmount());
            }
            tr.put("balance",t.getFinalBalance());
            transactionsJsonList.put(tr);
        }
        return transactionsJsonList;
    }

    public JSONArray getUserBets(User u, JSONArray transactionsListJson){
        
        List<Bet> bets = u.getBets();

        for(Bet b : bets){
            JSONObject betObj = new JSONObject();
            betObj.put("date",b.getDate());
            betObj.put("description","Aposta");
            betObj.put("operation","-" + b.getAmount());
            betObj.put("balance",b.getFinal_balance());
            transactionsListJson.put(betObj);
            
            if(b.getState().equals("Closed") && b.getResult() == true){
                JSONObject winObj = new JSONObject();
                winObj.put("date", b.getDate());
                winObj.put("description", "ganho de aposta");
                winObj.put("operation", "+" + b.getWinnings());
                winObj.put("balance", b.getWinning_final_balance() );
                transactionsListJson.put(winObj);
            }
        }
        return transactionsListJson;
    }

    public String getTransactionHistory(String email){
        
        User u = userRepo.findUserByEmail(email).get();
        JSONObject response = new JSONObject();
        JSONArray ts = new JSONArray();

        ts = getUserTransactions(u, ts); // add user transactions to the reponse json

        //bets como transações

        ts = getUserBets(u, ts); // add user bets, and winnings to the response json

        response.put("transactions", ts); // create the final response json format 
    
        return response.toString();
    }


    private String recoverPasswordUser(String email){
        Optional<User> u = userRepo.findUserByEmail(email);
        if(u.isPresent()){
            String password = u.get().getPassword();
            //enviar email para o email acima com a password do utilizador
            mailService.passwordRecovery(email, password);
            return Logs.returnLogTrue();
        }
        return Logs.returnLogFalse();
    }

    private String recoverPasswordExpert(String email){
        Optional<Expert> e = expertRepo.findExpertByEmail(email);

        if(e.isPresent()){    
            String password = e.get().getPassword();
            //enviar email para o email acima com a password do utilizador
            mailService.passwordRecovery(email, password);
            return Logs.returnLogTrue();
        }
        return Logs.returnLogFalse();
    }
    
    public String recoverPassword(String email){
        return 
    }


    public String followGame(String email, int id_game){

        Game g = gameRepo.findById(id_game).get();
        User u = userRepo.findUserByEmail(email).get();

        //verificar se o jogo já está a ser seguido
        Set<User_follows_game> followed_games = u.getFollowingGames();
        for(User_follows_game user_follows_game : followed_games){
            if(user_follows_game.getGame().equals(g)){
                return Logs.returnLogFalse();
            }
        }

        User_follows_game ufg = new User_follows_game(u, g);

        g.registerObserver(ufg);
        gameRepo.save(g);

        return Logs.returnLogTrue(); //ta mal :)
    }
    
    public String unfollowGame(String email, int id_game){

        Game g = gameRepo.findById(id_game).get();
        User u = userRepo.findUserByEmail(email).get();


        //verificar se o jogo já está a ser seguido
        Set<User_follows_game> followed_games = u.getFollowingGames();
        List<User_follows_game> list_followed_games = new ArrayList<>(followed_games);

        for(User_follows_game user_follows_game : list_followed_games){
            if(user_follows_game.getGame().equals(g)){
                g.removeObserver(u);
                u.deleteFollowingGame(user_follows_game);

                gameRepo.save(g);
                userRepo.save(u);
                user_follows_game_Repo.deleteById(user_follows_game.getId());
                return Logs.returnLogTrue();
            }
        }

        return Logs.returnLogFalse();
    }


}
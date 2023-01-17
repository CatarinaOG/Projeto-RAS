package TP.RasBet.services;

import java.sql.Timestamp;
import java.time.Instant;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TP.RasBet.model.Transaction;
import TP.RasBet.repositories.*;
import TP.RasBet.model.*;
import TP.RasBet.config.Logs;

@Service
public class TransactionService implements ITransactionService{

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private TransactionRepo transactionRepo;



    private String deposit(JSONObject transactionForm, User u){
        if((int) transactionForm.get("cardNum") == 0){
            float op_value = Float.parseFloat(transactionForm.get("operationValue").toString());
            Transaction t = new Transaction("PayPal", op_value, Timestamp.from(Instant.now()));
            t.setFinalBalance(u.getWallet() + op_value);
            u.setWallet(u.getWallet() + op_value);
            userRepo.save(u);
            t.setUser(u);
            transactionRepo.save(t);
        }
        else{
            float op_value = Float.parseFloat(transactionForm.get("operationValue").toString());
            Transaction t = new Transaction("Credit Card", op_value, Timestamp.from(Instant.now()));
            t.setFinalBalance(u.getWallet() + op_value);
            u.setWallet(u.getWallet() + op_value);
            userRepo.save(u);
            t.setUser(u);
            transactionRepo.save(t);
        }
        return Logs.returnLogTrue();
    }

    private String withdraw(JSONObject transactionForm, User u){
        float op_value = Float.parseFloat(transactionForm.get("operationValue").toString());
        Transaction t = new Transaction("Withdraw", op_value, Timestamp.from(Instant.now()));
        t.setFinalBalance(u.getWallet() - op_value);

        if(u.getWallet() - op_value < 0.0f){
            return Logs.returnLogFalse();
        }
        u.setWallet(u.getWallet() - op_value);
        userRepo.save(u);
        t.setUser(u);
        transactionRepo.save(t);
        return Logs.returnLogTrue();
    }



    public String transaction(JSONObject transactionForm){//TransactionForm transactionForm){

        User u = userRepo.findUserByEmail((String) transactionForm.get("email_user")).get();

        if(((String) transactionForm.get("operation")).equals("deposit")){
            return deposit(transactionForm, u);
        }
        else{
            return withdraw(transactionForm, u);
        }
    }
    
}
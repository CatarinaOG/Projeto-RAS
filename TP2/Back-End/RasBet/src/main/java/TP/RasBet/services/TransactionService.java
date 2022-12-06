package TP.RasBet.services;

import java.sql.Timestamp;
import java.time.Instant;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TP.RasBet.model.Transaction;
import TP.RasBet.model.TransactionForm;
import TP.RasBet.repositories.*;
import TP.RasBet.model.*;

@Service
public class TransactionService implements ITransactionService{

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private TransactionRepo transactionRepo;


    public String transaction(JSONObject transactionForm){//TransactionForm transactionForm){

        User u = userRepo.findUserByEmail((String) transactionForm.get("email_user")).get();



        if(((String) transactionForm.get("operation")).equals("deposit")){
            if((int) transactionForm.get("cardNum") == 0){
                float op_value = Float.parseFloat(transactionForm.get("operationValue").toString());
                Transaction t = new Transaction("PayPal", op_value, Timestamp.from(Instant.now()));
                t.setFinalBalance(u.getWallet() + op_value);
                u.setWallet(u.getWallet() + op_value);
                userRepo.save(u);
                t.setUser(u);
                transactionRepo.save(t);
            }else{
                float op_value = Float.parseFloat(transactionForm.get("operationValue").toString());
                Transaction t = new Transaction("Credit Card", op_value, Timestamp.from(Instant.now()));
                t.setFinalBalance(u.getWallet() + op_value);
                u.setWallet(u.getWallet() + op_value);
                userRepo.save(u);
                t.setUser(u);
                transactionRepo.save(t);
            }
            
            
        }
        else{
            float op_value = Float.parseFloat(transactionForm.get("operationValue").toString());
            Transaction t = new Transaction("Withdraw", op_value, Timestamp.from(Instant.now()));
            t.setFinalBalance(u.getWallet() - op_value);

            if(u.getWallet() - op_value < 0.0f){
                return "{\"confirmed\" : \"false\"" + "}";
            }
            u.setWallet(u.getWallet() - op_value);
            userRepo.save(u);
            t.setUser(u);
            transactionRepo.save(t);
        }
        
        
        return "{\"confirmed\" : \"true\"}";
    }
    
}
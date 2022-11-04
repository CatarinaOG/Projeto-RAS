package TP.RasBet.services;

import java.sql.Timestamp;
import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TP.RasBet.model.Transaction;
import TP.RasBet.model.TransactionForm;
import TP.RasBet.repositories.*;
import TP.RasBet.model.*;

@Service
public class TransactionService{

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private TransactionRepo transactionRepo;


    public String transaction(TransactionForm transactionForm){

        User u = userRepo.findUserByEmail(transactionForm.getEmail_user()).get();



        if(transactionForm.getOperation().equals("deposit")){
            if(transactionForm.getCardNum() == 0){
                Transaction t = new Transaction("PayPal", transactionForm.getOperationValue(), Timestamp.from(Instant.now()));
                t.setFinalBalance(u.getWallet() + transactionForm.getOperationValue());
                u.setWallet(u.getWallet() + transactionForm.getOperationValue());
                userRepo.save(u);
                t.setUser(u);
                transactionRepo.save(t);
            }else{
                Transaction t = new Transaction("Credit Card", transactionForm.getOperationValue(), Timestamp.from(Instant.now()));
                t.setFinalBalance(u.getWallet() + transactionForm.getOperationValue());
                u.setWallet(u.getWallet() + transactionForm.getOperationValue());
                userRepo.save(u);
                t.setUser(u);
                transactionRepo.save(t);
            }
            
            
        }
        else{
            Transaction t = new Transaction("Withdraw", transactionForm.getOperationValue(), Timestamp.from(Instant.now()));
            t.setFinalBalance(u.getWallet() - transactionForm.getOperationValue());

            if(u.getWallet() - transactionForm.getOperationValue() < 0.0f){
                return "{\"confirmed\" : \"false\"" + "}";
            }
            u.setWallet(u.getWallet() - transactionForm.getOperationValue());
            userRepo.save(u);
            t.setUser(u);
            transactionRepo.save(t);
        }
        
        
        return "{\"confirmed\" : \"true\"}";
    }
    
}
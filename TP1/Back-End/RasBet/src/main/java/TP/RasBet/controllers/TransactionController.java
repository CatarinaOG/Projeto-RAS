package TP.RasBet.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TP.RasBet.model.TransactionForm;
import TP.RasBet.services.TransactionService;

@RestController
@RequestMapping(value = "/api/transactions")
public class TransactionController{

    @Autowired
    private TransactionService transactionService;
    
    @PostMapping(value = "/")
    public String transaction(@RequestBody TransactionForm transactionForm){
        return transactionService.transaction(transactionForm);
    }

}
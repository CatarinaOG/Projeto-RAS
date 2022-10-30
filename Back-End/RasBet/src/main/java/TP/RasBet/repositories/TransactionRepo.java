package TP.RasBet.repositories;

import TP.RasBet.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TransactionRepo extends JpaRepository<Transaction, Integer>{
}

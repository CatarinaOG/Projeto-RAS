package TP.RasBet.repositories;

import TP.RasBet.model.Bet;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BetRepo extends JpaRepository<Bet, Integer>{
}

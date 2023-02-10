package TP.RasBet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import TP.RasBet.model.*;

public interface GamesInOneBetRepo  extends JpaRepository<GamesInOneBet, Integer>{
    
}

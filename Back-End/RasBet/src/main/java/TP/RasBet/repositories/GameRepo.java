package TP.RasBet.repositories;

import TP.RasBet.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GameRepo extends JpaRepository<Game, Integer>{
}

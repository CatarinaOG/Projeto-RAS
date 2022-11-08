package TP.RasBet.repositories;

import TP.RasBet.model.Game;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface GameRepo extends JpaRepository<Game, Integer>{

    @Query(value = "SELECT * FROM game WHERE (participantA = ?1) OR (participantB = ?1)",nativeQuery = true)
    List<Game> findGameByParticipant(String participant);


}

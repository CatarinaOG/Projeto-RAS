package TP.RasBet.repositories;

import TP.RasBet.model.Expert;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface ExpertRepo extends JpaRepository<Expert, Integer>{

    @Query(value = "SELECT * FROM Expert WHERE email = ?1", nativeQuery = true)
    Optional<Expert> findExpertByEmail(String email);


}

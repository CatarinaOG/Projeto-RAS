package TP.RasBet.repositories;

import TP.RasBet.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface UserRepo extends JpaRepository<User, Integer>{

    @Query(value = "SELECT * FROM User WHERE email = ?1",nativeQuery = true)
    Optional<User> findUserByEmail(String email);

    //SELECT u FROM User u WHERE u.email = 'email';

}

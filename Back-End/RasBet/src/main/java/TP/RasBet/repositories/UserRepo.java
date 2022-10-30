package TP.RasBet.repositories;

import TP.RasBet.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepo extends JpaRepository<User, Integer>{
}

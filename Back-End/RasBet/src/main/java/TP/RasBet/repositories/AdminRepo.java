package TP.RasBet.repositories;

import TP.RasBet.model.Admin;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface AdminRepo extends JpaRepository<Admin, Integer>{
    @Query(value = "SELECT * FROM Admin WHERE email = ?1",nativeQuery = true)
    Optional<Admin> findAdminByEmail(String email);
}

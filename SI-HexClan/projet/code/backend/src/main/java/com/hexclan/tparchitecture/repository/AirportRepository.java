package com.hexclan.tparchitecture.repository;

import com.hexclan.tparchitecture.entity.Airport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AirportRepository extends JpaRepository<Airport, Integer> {

    Optional<Airport> findByCode(String code);
}

package com.hexclan.tparchitecture.repository;

import com.hexclan.tparchitecture.entity.FlightTicket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightTicketRepository extends JpaRepository<FlightTicket, Integer> {
}

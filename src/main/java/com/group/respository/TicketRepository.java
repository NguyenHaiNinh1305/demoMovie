package com.group.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer>{

}

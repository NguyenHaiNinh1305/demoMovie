package com.group.respository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.group.entity.Seat;

public interface SeatRepository extends JpaRepository<Seat, Integer>{
	Seat findSeatById(int id);
	@Transactional
	@Modifying
	@Query(value ="UPDATE `movie`.`seat` SET `seat_status` = 'empty', `ticket_ID` = '0' WHERE (`ticket_ID` = ?1);", nativeQuery = true)
	void updateSeatByTicketId(int ticketID);
}

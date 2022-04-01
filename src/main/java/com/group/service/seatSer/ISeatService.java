package com.group.service.seatSer;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.group.entity.Seat;
import com.group.form.UpdatingSeatForm;

public interface ISeatService {
	
	public Seat getSeatById(int id);
	public void updateSeatStatus(int id, Seat seat);
	public void updateSeat(int id, UpdatingSeatForm form);
	public void updateSeatByTicketID(int ticketID);
	public List<Seat> getAllSeat();
	
}

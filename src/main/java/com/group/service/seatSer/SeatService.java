package com.group.service.seatSer;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group.entity.Seat;
import com.group.form.UpdatingSeatForm;
import com.group.respository.SeatRepository;

@Service
public class SeatService implements ISeatService  {
	 @Autowired
	 private SeatRepository seatRepository;
	
	 @Autowired
	 private ModelMapper modelMapper;
	@Override
	public void updateSeatStatus(int id, Seat seat) {
		// TODO Auto-generated method stub
		seat = seatRepository.findSeatById(id);
		seat.setId(id);
		seatRepository.save(seat);
	}

	@Override
	public List<Seat> getAllSeat() {
		// TODO Auto-generated method stub
		return seatRepository.findAll();
	}

	@Override
	public Seat getSeatById(int id) {
		// TODO Auto-generated method stub
		return seatRepository.findSeatById(id);
	}

	@Override
	public void updateSeat(int id, UpdatingSeatForm form) {
		// TODO Auto-generated method stub
		Seat seat = seatRepository.findSeatById(id);
		seat = modelMapper.map(form, Seat.class);
		seat.setId(id);
		seatRepository.save(seat);
		
	}

	@Override
	public void updateSeatByTicketID(int ticketID) {
		// TODO Auto-generated method stub
		seatRepository.updateSeatByTicketId(ticketID);
	}

	
}

package com.group.service.ticketSer;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.group.entity.Ticket;
import com.group.form.CreatingTicketForm;
import com.group.form.UpdatingSeatForm;
import com.group.respository.MovieRepository;
import com.group.respository.SeatRepository;
import com.group.respository.TicketRepository;
import com.group.service.seatSer.ISeatService;

@Service
public class TicketService implements ITicketService {

	@Autowired
	private TicketRepository ticketRepository;

	@Autowired
	private ISeatService seatService;

	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private SeatRepository seatRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Page<Ticket> getAllTickets(Pageable pageable) {
		// TODO Auto-generated method stub
		return ticketRepository.findAll(pageable);
	}

	@Override
	public Ticket getTicketById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateTicket(int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void createTicket(CreatingTicketForm form, List<Integer> seatID) {
		// TODO Auto-generated method stub
		List<Ticket> listorderlines = ticketRepository.findAll();
		int id = listorderlines.get(listorderlines.size()-1).getId();
		id +=1;
		form.setId(id);
		Ticket ticket = modelMapper.map(form, Ticket.class);
		ticketRepository.save(ticket);
		for (Integer integer : seatID) {
			UpdatingSeatForm formS =new UpdatingSeatForm();
			formS.setSeatStatus("occupied");
			formS.setTicketId(form.getId());
			
			seatService.updateSeat(integer, formS);
		}

	}

	@Override
	public void deleteTicket(int id) {
		// TODO Auto-generated method stub
		Ticket ticket = ticketRepository.findById(id).get();
		ticketRepository.delete(ticket);
		seatService.updateSeatByTicketID(id);
		
		
	}



}

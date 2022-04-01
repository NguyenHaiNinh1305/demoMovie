package com.group.service.ticketSer;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.group.entity.Ticket;
import com.group.form.CreatingAccountForm;
import com.group.form.CreatingTicketForm;

public interface ITicketService {

	public Page<Ticket> getAllTickets(Pageable pageable);

	public Ticket getTicketById(int id);

	public void createTicket(CreatingTicketForm form, List<Integer> seatID);

	public void updateTicket(int id);
	public void deleteTicket(int id);
}

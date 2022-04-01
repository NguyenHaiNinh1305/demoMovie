package com.group.service.OdlTicketSer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.group.entity.OrderlineTicket;
import com.group.form.CreatingUpdateOdlTicketForm;

public interface IOdlTicketService {
	public Page<OrderlineTicket> getAllOrderlines(Pageable pageable);
	public void createOrderlineTicket(CreatingUpdateOdlTicketForm form);
	public void deleteOrderLineTicket(int id);
}

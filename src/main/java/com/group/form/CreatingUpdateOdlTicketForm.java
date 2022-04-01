package com.group.form;

import com.group.entity.Ticket;
import com.group.entity.OrderlineTicket.TicketType;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class CreatingUpdateOdlTicketForm {
	
	private int ticketNum;

	private String tickeType;

	private int ticketID;
}

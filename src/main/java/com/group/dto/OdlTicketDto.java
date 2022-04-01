package com.group.dto;

import com.group.entity.Ticket;
import com.group.entity.OrderlineTicket.TicketType;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class OdlTicketDto {
	
	private int ticketNum;

	private String ticketType;

	private int  ticketID;
}

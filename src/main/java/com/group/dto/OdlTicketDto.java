package com.group.dto;

import com.group.entity.Ticket;

import java.util.Date;

import com.group.entity.OrderlineTicket.TicketType;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class OdlTicketDto {
private int id;
	
	private int ticketNum;

	private String ticketType;

	private int  ticketID;
	private Date ticketAccomTime;
	private String ticketMovieName;
	
	
}

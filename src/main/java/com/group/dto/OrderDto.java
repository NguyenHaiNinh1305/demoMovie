package com.group.dto;

import java.util.Date;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.group.entity.OrderlineTicket;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OrderDto {
	
	
	private int id;
	@JsonFormat(pattern = "yyyy-MM-dd")
	@NotNull
	private String orderDate;

	@JsonFormat(pattern = "HH-MM-ss")
	@NotNull
	private String timeStart;

	@NotNull
	private String payment;

	@NotNull
	private int accountID;
	
	private Date orderlineTicketTicketAccomTime;

	private int orderlineTicketID;
	
	private String orderlineTicketTicketMovieName;
	
	
	
	
	
	
}



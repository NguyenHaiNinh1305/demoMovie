package com.group.dto;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OrderDto {

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

	@NotNull
	private int oderlineSnackID;

	private int orderlineTicketID;
}

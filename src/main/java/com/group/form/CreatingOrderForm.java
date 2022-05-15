package com.group.form;

import java.sql.Date;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.group.service.AccountSer.IAccountService;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatingOrderForm {
	
	private int id;
	@JsonFormat(pattern = "yyyy-MM-dd")
	@NotNull
	private Date orderDate;

	@JsonFormat(pattern = "HH:mm:ss")
	@NotNull
	private Date timeStart;

	@NotNull
	private String payment;

	private int accountID;
	


	@NotNull
	private int orderlineTicketID;
}

package com.group.form;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.group.dto.MovieDto;
import com.group.dto.SeatDto;

import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class CreatingTicketForm {
	
	private int id;
	private int movieID;
	 @JsonFormat(pattern = "HH:mm:ss", timezone = "vietnam/hanoi")
	private Date accomTime;

	private int ticketPrice;

	
}

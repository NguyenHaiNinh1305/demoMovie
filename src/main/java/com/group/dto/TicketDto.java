package com.group.dto;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Required;

import com.group.entity.Movie;
import com.group.entity.Seat;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class TicketDto {
	
	private int id;
	private int movieId;
	private String movieName;

	private Date accomTime;

	private int ticketPrice;

	private List<SeatDto> ListSeats;
	
}

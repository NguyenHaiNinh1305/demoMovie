package com.group.dto;

import java.util.Date;
import java.util.List;

import com.group.entity.Movie;
import com.group.entity.Seat;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class TicketDto {
	
	private MovieDto movie;

	private Date accomTime;

	private int ticketPrice;

	private List<SeatDto> ListSeats;
}

package com.group.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group.dto.MovieDto;
import com.group.dto.SeatDto;
import com.group.dto.TicketDto;
import com.group.entity.Movie;
import com.group.entity.Seat;
import com.group.entity.Ticket;
import com.group.form.CreatingTicketForm;
import com.group.respository.MovieRepository;
import com.group.respository.SeatRepository;
import com.group.service.ticketSer.ITicketService;

@RestController
@RequestMapping(value = "tickets")
public class TicketController {

	@Autowired
	private ITicketService iTicketService;

	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private SeatRepository seatRepository;
	@Autowired
	private ModelMapper modelMapper;

	@GetMapping()
	public Page<TicketDto> getAllTickets(Pageable pageable) {
		Page<Ticket> lisTickets = iTicketService.getAllTickets(pageable);
		List<TicketDto> lisTicketsDto = modelMapper.map(lisTickets.getContent(), new TypeToken<List<TicketDto>>() {
		}.getType());
		Page<TicketDto> pageTicketDto = new PageImpl<>(lisTicketsDto, pageable, lisTickets.getTotalElements());
		;
		return pageTicketDto;
	}

	@PostMapping(value = "/add")
	public void createTicket(@RequestBody CreatingTicketForm form,
			@RequestParam(value = "seatID", required = true) List<Integer> seatID) {

		TypeMap<CreatingTicketForm, Ticket> typeMap = modelMapper.getTypeMap(CreatingTicketForm.class, Ticket.class);

		if (typeMap == null) {
			modelMapper.addMappings(new PropertyMap<CreatingTicketForm, Ticket>() {

				@Override
				protected void configure() {
					skip(destination.getId());

				}
			});

			iTicketService.createTicket(form, seatID);
		}

	}
	
	@DeleteMapping(value  = "/delete")
	public void deleteTicket(@RequestParam(value = "id") int id) {
		iTicketService.deleteTicket(id);
	}
}

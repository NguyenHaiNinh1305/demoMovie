package com.group.controller;

import java.util.List;

import javax.transaction.Transactional;

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

import com.group.dto.AccountDto;
import com.group.dto.OdlTicketDto;
import com.group.dto.TicketDto;
import com.group.entity.OderlineSnack;
import com.group.entity.Order;
import com.group.entity.OrderlineTicket;
import com.group.entity.Ticket;
import com.group.form.CreatingTicketForm;
import com.group.form.CreatingUpdateOdlTicketForm;
import com.group.respository.MovieRepository;
import com.group.respository.OLTRepository;
import com.group.respository.TicketRepository;
import com.group.service.OdlTicketSer.IOdlTicketService;

@RestController
@RequestMapping(value = "ODLs")
public class OLTController {

	@Autowired
	IOdlTicketService iOdlTicketService;

	@Autowired
	private OLTRepository repository;
	
	@Autowired
	private TicketRepository ticketRepository;
	
	
	@Autowired
	ModelMapper modelMapper;

	@GetMapping()
	public Page<OdlTicketDto> getOrderlineTickets(Pageable pageable) {
		Page<OrderlineTicket> pageOdlT = iOdlTicketService.getAllOrderlines(pageable);

		List<OdlTicketDto> ListOdlDto = modelMapper.map(pageOdlT.getContent(), new TypeToken<List<OdlTicketDto>>() {
		}.getType());
		Page<OdlTicketDto> pageOdlTDTO = new PageImpl<>(ListOdlDto, pageable, pageOdlT.getTotalElements());
		return pageOdlTDTO;
	}
	
	@GetMapping(value = "once")
	public TicketDto getOrderlineTicketsbyId(@RequestParam(value = "id", required =  true) int id) {
		
		OrderlineTicket orderlineTicket = repository.getById(id);
		OdlTicketDto odlTicketDto = modelMapper.map(orderlineTicket, OdlTicketDto.class);
		Ticket ticket = ticketRepository.getById(odlTicketDto.getTicketID());
		TicketDto ticketDto = modelMapper.map(ticket, TicketDto.class);
		
		
		return ticketDto;
	}
	@PostMapping(value = "/add")
	public void creatOrderLineTicket(@RequestBody CreatingUpdateOdlTicketForm form) {
		List<OrderlineTicket>listorderlines =  repository.findAll();
		int id = listorderlines.get(listorderlines.size()-1).getId();
		
			form.setId(id+1);
		
		iOdlTicketService.createOrderlineTicket(form);
		
	}
	
	@DeleteMapping(value = "/delete")
	public void deleteOrderLineTicket(@RequestParam(value = "id", required = true) int id) {
		iOdlTicketService.deleteOrderLineTicket(id);
	}
}

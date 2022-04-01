package com.group.service.OdlTicketSer;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.group.entity.OrderlineTicket;
import com.group.form.CreatingUpdateOdlTicketForm;
import com.group.respository.OLTRepository;
import com.group.service.ticketSer.ITicketService;

@Service
public class OdlTicketService implements IOdlTicketService {
	
	@Autowired 
	private ModelMapper modelMapper;
	
	@Autowired
	private OLTRepository oltRepository;
	
	@Autowired	
	private ITicketService iTicketService;

	@Override
	public Page<OrderlineTicket> getAllOrderlines(Pageable pageable) {
	 
		
		return oltRepository.findAll(pageable);
	}

	@Override
	public void createOrderlineTicket(CreatingUpdateOdlTicketForm form) {
		OrderlineTicket orderlineTicket = modelMapper.map(form, OrderlineTicket.class);
		oltRepository.save(orderlineTicket);
		
	}

	@Override
	public void deleteOrderLineTicket(int id) {
		// TODO Auto-generated method stub
		OrderlineTicket orderlineTicket = oltRepository.findById(id).get();
		int TicketID = orderlineTicket.getTicket().getId();
		oltRepository.delete(orderlineTicket);
		iTicketService.deleteTicket(TicketID);
		
	}

}

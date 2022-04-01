package com.group.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group.dto.SeatDto;
import com.group.entity.Seat;
import com.group.respository.SeatRepository;
import com.group.service.seatSer.ISeatService;

@RestController
@RequestMapping(value = "seats")
public class SeatController {
	@Autowired
	private ISeatService iSeatService;
	
	@Autowired
	private ModelMapper modelMapper;
	@GetMapping()
	public List<Seat> getAllSeats(){
		return iSeatService.getAllSeat();
	}
	

	
	@PutMapping(value = "/update")
	public void updateStatusSeat(@RequestParam(value = "id", required = true) int id,
								@RequestBody Seat seat) {
		iSeatService.updateSeatStatus(id, seat);
	}
	
	
}

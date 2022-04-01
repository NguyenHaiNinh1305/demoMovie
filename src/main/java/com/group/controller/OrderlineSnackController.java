package com.group.controller;

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

import com.group.dto.OrderLineSnackDto;
import com.group.entity.OderlineSnack;
import com.group.form.CreatingOrderlineSnackForm;
import com.group.service.orderlineSnackSer.IOrderLineSnackService;

@RestController
@RequestMapping(value = "orderlineSnacks")
public class OrderlineSnackController {

		@Autowired
		private ModelMapper modelMapper;
		
		@Autowired
		private IOrderLineSnackService service;
		
	@GetMapping()
	public Page<OrderLineSnackDto> getAllOrder(Pageable pageable){
		Page<OderlineSnack> pageODLS = service.getAllOrderlineSnacks(pageable);
		
		List<OrderLineSnackDto> listODLS = modelMapper.map(pageODLS.getContent(), 
				new TypeToken<List<OrderLineSnackDto>>() {}.getType());
		
		Page<OrderLineSnackDto> pageODLSDto = new PageImpl<>(listODLS,pageable, pageODLS.getTotalElements());
		
		return pageODLSDto;
	}
	
	@PostMapping(value = "/add")
	public void createOrder(@RequestBody CreatingOrderlineSnackForm form) {
		TypeMap<CreatingOrderlineSnackForm, OderlineSnack> typeMap 
		= modelMapper.getTypeMap(CreatingOrderlineSnackForm.class, OderlineSnack.class);
		
		if(typeMap == null) {
			modelMapper.addMappings(new PropertyMap<CreatingOrderlineSnackForm, OderlineSnack>() {

				@Override
				protected void configure() {
					skip(destination.getId());
					
				}
				
			});
			service.createOrderlineSnack(form);
		}
	}
	
	@DeleteMapping(value = "/delete")
	public void deleteOrder(@RequestParam (value = "id", required = true) int id) {
		service.deleteOrderlineSnack(id);
	}
}

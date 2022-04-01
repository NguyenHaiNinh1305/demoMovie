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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group.dto.OrderDto;
import com.group.entity.Account;
import com.group.entity.Order;
import com.group.form.CreatingOrderForm;
import com.group.service.AccountSer.IAccountService;
import com.group.service.OrderSer.IOrderService;

@RestController
@RequestMapping(value = "orders")
public class OrderController {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private IOrderService service;
	@Autowired
	private IAccountService accountService;

	@GetMapping()
	public Page<OrderDto> getAllOrders(Pageable pageable) {
		Page<Order> pageOrders = service.getAllOrders(pageable);

		List<OrderDto> listODTOs = modelMapper.map(pageOrders.getContent(), new TypeToken<List<OrderDto>>() {
		}.getType());

		Page<OrderDto> pageOrderDtos = new PageImpl<>(listODTOs, pageable, pageOrders.getTotalElements());

		return pageOrderDtos;
	}

	@PostMapping(value = "/add")
	public void createOrder(@RequestBody CreatingOrderForm form) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication() ;
		Account account = accountService.getAccountByAccountName(auth.getName());
		int accountID  = account.getId();
		form.setAccountID(accountID);
		TypeMap<CreatingOrderForm, Order> typeMap = modelMapper.getTypeMap(CreatingOrderForm.class,
				Order.class);
		if (typeMap == null) {
			modelMapper.addMappings(new PropertyMap<CreatingOrderForm, Order>() {

				@Override
				protected void configure() {
					skip(destination.getId());

				}

			});
			service.createOrder(form);
		}
	}
	
	@DeleteMapping(value = "delete")
	public void delteOrder(@RequestParam(value = "id", required = true) int id) {
	service.deleteOrder(id);
	}
}

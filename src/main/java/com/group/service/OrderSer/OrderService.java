package com.group.service.OrderSer;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.group.entity.Order;
import com.group.form.CreatingOrderForm;
import com.group.respository.OrderRepository;
import com.group.service.OdlTicketSer.IOdlTicketService;
import com.group.service.orderlineSnackSer.IOrderLineSnackService;

@Service
public class OrderService implements IOrderService {
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired 
	private OrderRepository repository;
	@Autowired
	private IOrderLineSnackService iOrderLineSnackService;
	@Autowired 
	private IOdlTicketService iOdlTicketService;

	@Override
	public Page<Order> getAllOrders(Pageable pageable) {
		// TODO Auto-generated method stub
		return repository.findAll(pageable);
	}

	@Override
	public void createOrder(CreatingOrderForm form) {
		Order order = modelMapper.map(form, Order.class);
		repository.save(order);
		
	}

	@Override
	public void deleteOrder(int id) {
		// TODO Auto-generated method stub
		Order order =  repository.findById(id).get();
		int orderticketid = order.getOrderlineTicket().getId();
		//int odersnackid = order.getOderlineSnack().getId();
		repository.delete(order);
		iOdlTicketService.deleteOrderLineTicket(orderticketid);
		//iOrderLineSnackService.deleteOrderlineSnack(odersnackid);
	}
	
}

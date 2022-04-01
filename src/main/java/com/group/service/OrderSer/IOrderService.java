package com.group.service.OrderSer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.group.entity.Order;
import com.group.form.CreatingOrderForm;
import com.group.form.CreatingUpdateOdlTicketForm;

public interface IOrderService {
	public Page<Order> getAllOrders(Pageable pageable);
	public void createOrder(CreatingOrderForm form);
	public void deleteOrder(int id);
}

package com.group.service.orderlineSnackSer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.group.entity.OderlineSnack;
import com.group.form.CreatingOrderlineSnackForm;

public interface IOrderLineSnackService {
	public Page<OderlineSnack> getAllOrderlineSnacks(Pageable pageable);
	public void createOrderlineSnack(CreatingOrderlineSnackForm form);
	public void deleteOrderlineSnack(int id);
}

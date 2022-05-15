package com.group.service.orderlineSnackSer;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.group.entity.OderlineSnack;
import com.group.form.CreatingOrderlineSnackForm;
import com.group.respository.OrderlineSnackRepository;

@Service
public class OrderlineSnackService implements IOrderLineSnackService {
	@Autowired
	private OrderlineSnackRepository repository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Page<OderlineSnack> getAllOrderlineSnacks(Pageable pageable) {
		// TODO Auto-generated method stub
		return repository.findAll(pageable);
	}

	@Override
	
	public void createOrderlineSnack(CreatingOrderlineSnackForm form) {
		// TODO Auto-generated method stub
		OderlineSnack oderlineSnack = modelMapper.map(form, OderlineSnack.class);
		repository.save(oderlineSnack);

	}

	@Override
	public void deleteOrderlineSnack(int id) {
		// TODO Auto-generated method stub
		OderlineSnack oderlineSnack = repository.findById(id).get();
		repository.delete(oderlineSnack);

	}

}

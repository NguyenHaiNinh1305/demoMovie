package com.group.service.SnackSer;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.group.dto.SnackDto;
import com.group.entity.Movie;
import com.group.entity.Snack;
import com.group.form.CreatingSnackForm;
import com.group.respository.SnackRepository;

@Service
public class SnackService implements ISnackService {
	
	@SuppressWarnings("unused")
	@Autowired
	private SnackRepository snackRepository;
	
	@SuppressWarnings("unused")
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public Page<Snack> getAllSnacks(Pageable pageable) {
		// TODO Auto-generated method stub
		return snackRepository.findAll(pageable);
	}

	@Override
	public Snack getSnackById(int id) {
		// TODO Auto-generated method stub
		return snackRepository.findById(id).get();
	}

	@Override
	public void createSnack(CreatingSnackForm form) {
		// TODO Auto-generated method stub
		Snack snack = modelMapper.map(form, Snack.class);
		snackRepository.save(snack);
	}

	@Override
	public void updateSnack(int id, SnackDto snackDto) {
		// TODO Auto-generated method stub
		if(snackRepository.existsById(id) == true) {
			Snack snack = snackRepository.findById(id).get();
			snack = modelMapper.map(snackDto, Snack.class);
			snack.setId(id);
			snackRepository.save(snack);
		}
	}

	@Override
	public boolean ExistSnackById(int id) {
		// TODO Auto-generated method stub
		return snackRepository.existsById(id);
	}

	@Override
	public void deleteSnack(int id) {
		if(ExistSnackById(id)) {
			Snack snack = getSnackById(id);
			snackRepository.delete(snack);
		}
		
	}

	

}

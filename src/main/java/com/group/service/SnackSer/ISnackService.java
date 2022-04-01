package com.group.service.SnackSer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.group.dto.SnackDto;
import com.group.entity.Snack;
import com.group.form.CreatingSnackForm;

public interface ISnackService {
	public Page<Snack> getAllSnacks(Pageable pageable);
	public Snack getSnackById(int id);
	public void createSnack(CreatingSnackForm form);
	public void updateSnack(int id, SnackDto snackDto);
	public void deleteSnack(int id);
	public boolean ExistSnackById(int id);
}

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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group.dto.SnackDto;
import com.group.entity.Order;
import com.group.entity.Snack;
import com.group.form.CreatingSnackForm;
import com.group.respository.SnackRepository;
import com.group.service.SnackSer.ISnackService;

@RestController
@RequestMapping(value = "snacks")
public class SnackController {
	@Autowired
	private ISnackService service;
	
	@Autowired
	private SnackRepository repository;

	@Autowired
	private ModelMapper modelMapper;
	
	@GetMapping()
	@PreAuthorize("hasAnyAuthority('staff', 'admin')")
	public Page<SnackDto> getAllSnacks(Pageable pageable) {
		Page<Snack> snackPages = service.getAllSnacks(pageable);

		List<SnackDto> listSnackDto = modelMapper.map(snackPages.getContent(), new TypeToken<List<SnackDto>>() {
		}.getType());

		Page<SnackDto> snackPagesDto = new PageImpl<>(listSnackDto, pageable, snackPages.getTotalElements());
		return snackPagesDto;
	}
	@PreAuthorize("hasAnyAuthority('admin')")
	@PostMapping(value = "/add")
	public void createSnack(@RequestBody CreatingSnackForm form) {
			
		List<Snack> listsnacks =  repository.findAll();
		int id = listsnacks.get(listsnacks.size()-1).getId();
		form.setId(id+1);
		service.createSnack(form);
		
	}
	@PreAuthorize("hasAnyAuthority('admin')")
	@PutMapping(value = "/update")
	public void updateSnack(@RequestParam(value = "id", required = true) int id, @RequestBody SnackDto snackDto) {

		service.updateSnack(id, snackDto);

	}
	@PreAuthorize("hasAnyAuthority('admin')")
	@DeleteMapping(value = "/delete")
	public void deleteSnack(int id) {
		service.deleteSnack(id);
	}
}

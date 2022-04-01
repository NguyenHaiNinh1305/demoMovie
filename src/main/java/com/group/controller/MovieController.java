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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.group.dto.AccountDto;
import com.group.dto.MovieDto;
import com.group.entity.Account;
import com.group.entity.Movie;
import com.group.form.CreateUpdateMovieForm;
import com.group.form.CreatingAccountForm;
import com.group.respository.MovieRepository;
import com.group.service.IMoveService;
import com.group.service.MovieService;

@RestController
@RequestMapping(value = "v1")
public class MovieController {

	@Autowired
	IMoveService moveService;
	@Autowired
	private ModelMapper modelMapper;

	@GetMapping(value = "/movie/list")
	public Page<MovieDto> getAllMovies(Pageable pageable, String search) {
		Page<Movie> entitiesPages = moveService.getAllMoives(pageable, search);

		List<MovieDto> listAccountDTOs = modelMapper.map(entitiesPages.getContent(), new TypeToken<List<MovieDto>>() {
		}.getType());

		Page<MovieDto> dPages = new PageImpl<>(listAccountDTOs, pageable, entitiesPages.getTotalElements());
		return dPages;
	}

	@PostMapping(value = "/movie/add")
	public void addMovie(@RequestBody CreateUpdateMovieForm form) {
		TypeMap<CreateUpdateMovieForm, Movie> typeMap = modelMapper.getTypeMap(CreateUpdateMovieForm.class,
				Movie.class);
		if (typeMap == null) {
			modelMapper.addMappings(new PropertyMap<CreateUpdateMovieForm, Movie>() {

				@Override
				protected void configure() {
					skip(destination.getId());

				}

			});
			moveService.createMovie(form);
		}
	}

	@GetMapping(value = "movie/{id}")
	public Movie getMovieById(@PathVariable(value = "id") int id) {
		return moveService.getMovieById(id);
	}

	@DeleteMapping(value = "movie/{id}")
	public void deleteMovie(@PathVariable(value = "id") int id) {
		moveService.deleteMoviebyId(id);
	}

	@PutMapping(value = "movie/{id}")
	public void updateMovie(@PathVariable(value = "id") int id, @RequestBody CreateUpdateMovieForm form) {
		moveService.updateMovieByid(id, form);
	}

}

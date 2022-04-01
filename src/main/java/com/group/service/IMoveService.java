package com.group.service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.group.entity.Movie;
import com.group.form.CreateUpdateMovieForm;

public interface IMoveService{
	public Page<Movie> getAllMoives(Pageable pageable, String search);
	public Movie getMovieById(int id);
	public Movie getMovieByName(String name);
	public void createMovie(CreateUpdateMovieForm form);
	public void updateMovieByid(int id, CreateUpdateMovieForm form);
	public void deleteMoviebyId(int id);
	public boolean isMovieExistsById(int id);
}

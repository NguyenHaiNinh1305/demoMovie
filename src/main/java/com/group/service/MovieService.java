package com.group.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.group.entity.Movie;
import com.group.form.CreateUpdateMovieForm;
import com.group.respository.MovieRepository;

@Service
public class MovieService implements IMoveService {

	 @Autowired
	 MovieRepository movieRepository;
	 @Autowired
	 private ModelMapper modelMapper;

	@Override
	public Page<Movie> getAllMoives(Pageable pageable, String search) {
		
		return movieRepository.findAll(pageable);
	}

	@Override
	public Movie getMovieById(int id) {
		// TODO Auto-generated method stub
		return movieRepository.findById(id).get();
	}

	@Override
	public Movie getMovieByName(String name) {
		// TODO Auto-generated method stub
		return movieRepository.findMovieByName(name);
	}

	@Override
	public void createMovie(CreateUpdateMovieForm form) {
		// TODO Auto-generated method stub
		Movie movie = modelMapper.map(form, Movie.class);
		movie = movieRepository.save(movie);
	}

	@Override
	public void updateMovieByid(int id, CreateUpdateMovieForm form) {
		// TODO Auto-generated method stub
		if(isMovieExistsById(id)) {
			Movie movie = movieRepository.findById(id).get();
			movie = modelMapper.map(form, Movie.class);
			movie.setId(id);
			movieRepository.save(movie);
			
		}
	}

	@Override
	public void deleteMoviebyId(int id) {
		if(isMovieExistsById(id)) {
			Movie movie = movieRepository.getById(id);
			movieRepository.delete(movie);
		}
	}

	@Override
	public boolean isMovieExistsById(int id) {
		// TODO Auto-generated method stub
		return movieRepository.existsById(id);
	}

}

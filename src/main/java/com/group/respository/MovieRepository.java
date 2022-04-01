package com.group.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group.entity.Movie;

public interface MovieRepository extends JpaRepository<Movie,Integer> {
	
	Movie findMovieByName(String name);
	
}

package com.group.dto;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MovieDto {
	private int id;
	private String name;
	
	
	private String director;
	
	
	private String cast;
	
	@JsonFormat(pattern = "HH:mm:ss")
	private Date durationStart;
	@JsonFormat(pattern = "HH:mm:ss")
	private Date durationEnd;
	

	private String genre;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date releaseDate;
	
	private String language;
	
	private String rate;
	
	private String poster;
}

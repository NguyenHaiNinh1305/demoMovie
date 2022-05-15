package com.group.form;

import java.util.Date;

import javax.persistence.Convert;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.method.P;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.group.utils.MyDateAttribute;
import com.group.utils.MyTimeAttribute;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateUpdateMovieForm {
	private int id;
	private String name;
	private String director;

	private String cast;
	
	
	@JsonFormat(pattern = "HH:mm:ss")
	//@Convert(converter =  MyTimeAttribute.class)
	private Date durationStart;
	
	//@Convert(converter =  MyTimeAttribute.class)
	@JsonFormat(pattern = "HH:mm:ss")
	private Date durationEnd;	
	private String genre;
	//@JsonFormat(pattern = "yyyy-MM-dd")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Convert(converter = MyDateAttribute.class)
	private Date releaseDate;

	private String language;

	private String rate;

	private String poster;
}

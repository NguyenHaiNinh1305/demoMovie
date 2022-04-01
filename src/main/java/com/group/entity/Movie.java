package com.group.entity;

import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "`movie`")
@Data
@NoArgsConstructor
public class Movie {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "movie_ID", nullable = false)
	private int id;
	
	@Column(name = "movie_name", nullable = false, length = 100)
	private String name;
	
	@Column(name = "director", nullable = false, length = 50)
	private String director;
	
	@Column(name = "cast", nullable = false, length = 255)
	private String cast;
	
	@Column(name = "duration_start", nullable = false, columnDefinition = "TIME")
	@Temporal(TemporalType.TIME)
	@DateTimeFormat(pattern = "HH:mm:ss")
	private Date durationStart;
	
	@Column(name = "duration_end", nullable = false, columnDefinition = "TIME")
	@Temporal(TemporalType.TIME)
	private Date durationEnd;
	
	@Column(name = "genre", nullable = false, length = 50)
	private String genre;
	
	@DateTimeFormat(pattern = "yyyy:MM:dd")
	@Temporal(TemporalType.DATE)
	@Column(name = "release_date", nullable = false, columnDefinition = "DATE")
	private Date releaseDate;
	
	@Column(name = "language", nullable = false, length = 100)
	private String language;
	
	@Column(name = "rated", nullable = false, length = 100)
	private String rate;
	
	@Column(name = "poster", length = 1000, nullable =  false)
	private String poster;
	
	@OneToMany(mappedBy = "movie")
	private List<Ticket> listTickets;
}
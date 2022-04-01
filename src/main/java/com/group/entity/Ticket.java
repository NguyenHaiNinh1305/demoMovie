package com.group.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`ticket`")
@Data
@NoArgsConstructor
public class Ticket {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ticket_ID", nullable = false)
	private int id;
	
	@Column(name = "accom_time", nullable = false)
	@Temporal(TemporalType.TIME)
	private Date accomTime;
	
	@Column(name = "ticket_price", nullable =  false)
	private int ticketPrice;
	
	@ManyToOne
	@JoinColumn(name = "movie_ID")
	private Movie movie;
	
	@OneToMany(mappedBy = "ticket")
	private List<Seat> ListSeats;
	
//	@OneToOne(mappedBy = "ticket", orphanRemoval = true)
//	@PrimaryKeyJoinColumn
	@OneToOne(mappedBy = "ticket")
	//@JoinColumn(name = "ticket_ID", referencedColumnName = "orderline_ticket_ID")
	private OrderlineTicket orderlineTicket;
}

package com.group.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`seat`")
@Data
@NoArgsConstructor
public class Seat {
	@Id
	@Column(name = "seat_ID", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "seat_status")
	@Enumerated(EnumType.STRING)
	private SeatStatus seatStatus;

	public enum SeatStatus {
		occupied, empty, selected;
	}
	
	@ManyToOne
	@JoinColumn(name = "ticket_ID")
	private Ticket ticket;
}

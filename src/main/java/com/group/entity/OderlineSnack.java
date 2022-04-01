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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orderline_snack")
@Data
@NoArgsConstructor

public class OderlineSnack {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "orderline_snack_ID", nullable = false)
	private int id;

	@Column(name = "snack_number", nullable = false)
	private int snacknumber;

	@Column(name = "snack_type", nullable = false)
	@Enumerated(EnumType.STRING)
	private SnackType snackType;
	
	@ManyToOne
	@JoinColumn(name = "snack_ID", referencedColumnName = "snack_ID")
	private Snack snack;
	
	@OneToOne(mappedBy = "oderlineSnack")
	private Order order;

	public enum SnackType {
		middle, big, small;
	}

}

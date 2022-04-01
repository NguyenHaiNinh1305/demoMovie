package com.group.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`Order`")
@Data
@NoArgsConstructor
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_ID", nullable = false)
	private int id;
	
	@Column(name = "order_date", nullable = false)
	@CreationTimestamp
	@Temporal(TemporalType.DATE)
	private Date orderDate;
	
	@Column(name = "time_start", nullable = false)
	@Temporal(TemporalType.TIME)
	private Date timeStart;
	
	@Column(name = "payment", nullable = false, length = 100)
	private String payment;
	
	@ManyToOne
	@JoinColumn(name = "account_ID", referencedColumnName = "account_ID")
	private Account account;
	
	@OneToOne
	@JoinColumn(name = "orderline_snack_ID", referencedColumnName = "orderline_snack_ID")
	private OderlineSnack oderlineSnack;
	
	@OneToOne
	@JoinColumn(name = "orderline_ticket_ID", referencedColumnName = "orderline_ticket_ID")
	private OrderlineTicket orderlineTicket;
}

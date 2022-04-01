package com.group.entity;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`orderline_ticket`")
@Data
@NoArgsConstructor
public class OrderlineTicket {

	@Id
	@Column(name = "orderline_ticket_ID", nullable = false)
	private int id;

	@Column(name = "ticket_number", nullable = false)
	private int ticketNum;
	

	@Column(name = "ticket_type", nullable = false)
	@Convert(converter = TicketTypeConverter.class)
	private TicketType tickeType;

//	@OneToOne
//	@MapsId
//	@JoinColumn(name = "ticket_ID")
	@OneToOne
	@JoinColumn(name = "ticket_ID", referencedColumnName = "ticket_ID")
	private Ticket ticket;
	
	
	@OneToOne(mappedBy = "orderlineTicket")
	private Order order;
	//enum
	public enum TicketType {
		regular("regular 2D"), gold("Gold Class 2D");

		private String value;

		private TicketType(String value) {
			// TODO Auto-generated constructor stub
			this.value = value;
		}

		public String getValue() {
			return value;
		}

		public static TicketType of(String value) {
			if (value == null) {
				return null;
			}

			for (TicketType ticketType : TicketType.values()) {

				if (ticketType.getValue().equals(value)) {
					return ticketType;
				}

			}
			return null;
		}
	}

}

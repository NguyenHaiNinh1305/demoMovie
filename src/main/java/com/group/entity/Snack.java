package com.group.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.group.entity.Account.Role;

import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "`snack`")
@Data
@NoArgsConstructor
public class Snack {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "snack_ID", nullable = false)
	private int id;
	
	@Column(name = "picture", length = 1000, nullable = false)
	private String picture;
	
	@Column(name = "snack_name", length = 100, nullable = false)
	private String snackname;
	
	@Column(name = "snack_price", nullable = false)
	private double snackprice;
	
	@Enumerated(EnumType.STRING)
    @Column(name = "snack_type", nullable = false)
    private snacktype snacktype;
	
	@OneToMany(mappedBy = "snack")
	private List<OderlineSnack> listOderlineSnacks;
	
	public enum snacktype {
        popcorn, drink;
    }
}

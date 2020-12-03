package com.hexclan.tparchitecture.entity;

import javax.persistence.*;

/**
 * Class representing an airport
 */
@Entity
@Table
public class Airport {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false, unique = true)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String code;

    public Airport(String name, String code) {
        this.name = name;
        this.code = code;
    }

    public Airport() {
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}

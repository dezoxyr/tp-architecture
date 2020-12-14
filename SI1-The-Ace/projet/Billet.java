package projet;

import java.util.Date;

public class Billet {
	private int id;
	private String depart;
	private String arrive;
	private int prix;
	private int disp;
	private String d;
	
	public Billet(int id, String d, String a, int p, int b, String date) {
		this.id = id;
		depart = d;
		arrive = a;
		prix = p;
		disp = b;
		this.setD(date);
	}
	
	public String getDepart() {
		return depart;
	}
	public void setDepart(String depart) {
		this.depart = depart;
	}
	public String getArrive() {
		return arrive;
	}
	public void setArrive(String arrive) {
		this.arrive = arrive;
	}
	public int getPrix() {
		return prix;
	}
	public void setPrix(int prix) {
		this.prix = prix;
	}
	public int isDisp() {
		return disp;
	}
	public void setDisp(int disp) {
		this.disp = disp;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getD() {
		return d;
	}

	public void setD(String date) {
		this.d = date;
	}
	
	
	
}

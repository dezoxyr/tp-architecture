package projet;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;

public class Reservation {
	private LinkedList<Billet> vols = new LinkedList<Billet>();

	public Reservation(int nbVol) {
		for(int i=0;i<nbVol;i++) {
			Random r = new Random();
			switch(r.nextInt(6)) {
			case 1:
				this.vols.add(new Billet(i,"JFK","CDG",400,1,"06/12/2020"));
				break;
			case 2:
				this.vols.add(new Billet(i,"CDG","JFK",450,1,"07/12/2020"));
				break;
			case 3:
				this.vols.add(new Billet(i,"DTW","JFK",200,1,"10/12/2020"));
				break;
			case 4:
				this.vols.add(new Billet(i,"CDG","DTW",150,1,"12/12/2020"));
				break;
			case 5:
				this.vols.add(new Billet(i,"JFK","DTW",300,1,"15/12/2020"));
				break;
			case 6:
				this.vols.add(new Billet(i,"DTW","CDG",299,1,"20/12/2020"));
				break;
			}
			
		}
	}

	public void doReserv(int nb) {
		Iterator<Billet> it = vols.iterator();
		while(it.hasNext()) {
			Billet b = it.next();
			if(b.getId() == nb) {
				b.setDisp(0);
				
			}
		}
	}

	public List<Billet> getVols(){
		List<Billet> vol = new ArrayList<Billet>();
		Iterator<Billet> it = vols.iterator();
		while(it.hasNext()) {
			Billet b = it.next();
			if(b.isDisp() == 1) {
				vol.add(b);
			}
		}
		return vol;
	}

	public List<Billet> getReserv(){
		List<Billet> r = new ArrayList<Billet>();
		Iterator<Billet> it = vols.iterator();
		while(it.hasNext()) {
			Billet b = it.next();
			if(b.isDisp() == 0) {
				r.add(b);
				
			}
		}
		return r;
	}

	public void printVols(int type) {
		List<Billet> list;
		if(type == 0) {
			list = getReserv();
		}else {
			list = getVols();
		}
		Iterator<Billet> it = list.iterator();
		while(it.hasNext()) {
			Billet b = it.next();
			if(type == 0) {
				System.out.println("Billet : "+b.getId()+" D : "+b.getDepart()+" A : "+b.getArrive()+" P : "+b.getPrix()+"\n");
			}else {
				System.out.println("Billet : "+b.getId()+" D : "+b.getDepart()+" A : "+b.getArrive()+" P : "+b.getPrix()+" Disp : "+b.isDisp()+"\n");
			}
		}
	}
}

package projet;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.Scanner;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

import com.sun.net.httpserver.HttpServer;

public class Main {

	public static void main(String[] args) {
		
		try {
			HttpServer server = HttpServer.create(new InetSocketAddress("localhost",8001), 0);
			ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor)Executors.newFixedThreadPool(10);
			server.createContext("/test", new MyHttpHandler());
			server.setExecutor(threadPoolExecutor);
			server.start();
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		//version console
		/*String choice = "";
		Reservation r = new Reservation(15);
		
		while(!choice.equals("exit")) {
			
			System.out.println("Que souhaitez vous ?\n1- Voir la liste disponible\n2- Voir vos reservations\n3- Faire une reservation\n4- Quitter\n");
			Scanner sc = new Scanner(System.in);
			choice = sc.next();
			switch(choice) {
			case "1":
				r.printVols(1);
				break;
			case "2":
				r.printVols(0);
				break;
			case "3":
				System.out.println("Entrez l'id de votre vol :\n");
				String s = sc.next();
				int i = Integer.parseInt(s);
				r.doReserv(i);
				System.out.println("Billet :"+i+" reserve\n");
				break;
			case "4":
				choice = "exit";
				break;
			}
		}*/
	}

}

package projet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Iterator;
import java.util.List;

import org.json.simple.JSONObject;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class MyHttpHandler implements HttpHandler {
	
	private Reservation r = new Reservation(20);

	@Override
	public void handle(HttpExchange exchange) throws IOException {
		String requestParamValue=null;
			
		    if("GET".equals(exchange.getRequestMethod())) {
		       requestParamValue = handleGetRequest(exchange);
		     }else if("POST".equals(exchange)) {
		       //requestParamValue = handlePostRequest(exchange);
		      }  
		    handleResponse(exchange,requestParamValue); 
	}

	private String handleGetRequest(HttpExchange httpExchange) {
		return httpExchange.
				getRequestURI()
				.toString()
				.split("\\?")[1]
				.split("=")[1];
				
	}
	
	private void handleResponse(HttpExchange httpExchange, String requestParamValue)  throws  IOException {
					httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
					JSONObject js = new JSONObject();
					//js.put("name",requestParamValue);
		            OutputStream outputStream = httpExchange.getResponseBody();
		            if(requestParamValue.equals("all")) {
		            	List<Billet> vol = r.getVols();
		            	Iterator<Billet> it = vol.iterator();
		        		while(it.hasNext()) {
		        			Billet b = it.next();
		        			js.put(b.getId(),"Depart : "+b.getDepart()+" Arrive : "+b.getArrive()+" Date : "+b.getD()+" --Disponibilite : "+b.isDisp());
		        		}
		            }else if(requestParamValue.equals("booked")) {
		            	List<Billet> vols = r.getReserv();
		            	Iterator<Billet> ite = vols.iterator();
		        		while(ite.hasNext()) {
		        			Billet bi = ite.next();
		        			js.put(bi.getId()," Depart : "+bi.getDepart()+" Arrive : "+bi.getArrive()+" Date : "+bi.getD());
		        		}
		            }else{
		            	
		            	int i = Integer.parseInt(requestParamValue);
		            	r.doReserv(i);
		            	js.put("id",i);
		            }
		            
		            // this line is a must
		            httpExchange.sendResponseHeaders(200, js.toString().length());
		            outputStream.write(js.toString().getBytes());
		            outputStream.flush();
		            outputStream.close();
		        }
}

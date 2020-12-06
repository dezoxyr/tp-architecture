<?php


namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Billet;
use App\Utilisateur;

session_start();

class ControllerBillet extends Controller
{

    public $billet,$billet2,$billet3,
    $billet4,$billet5,$billet6,$billet7,
    $billet8; 

     

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function ShowIndex(){
        return view('index');
    }

    public function connexion(Request $request){
        
        
        $email = $request->input('email');
        if($email == "test@test.fr" || $email== "test2@test.fr"){
            setcookie("utilisateur",$email);
            return redirect('ProgDistrib/billet');
        }
        else{
            return view('index', ['erreur' => 'oui']);
        }
        
    }

    //
    public function showBillet(){

        $billet = new Billet(1,"CDG","JFK",320);
        $billet2 = new Billet(2,"CDG","JFK",500);
        $billet3 = new Billet(3,"DTW","JFK",350);
        $billet4 = new Billet(4,"DTW","JFK",1500);
        $billet5 = new Billet(5,"JFK","DTW",500);
        $billet6 = new Billet(6,"CDG","DTW",200);
        $billet7 = new Billet(7,"DTW","CDG",700);
        $billet8 = new Billet(8,"JDK","DTW",300);

        $liste = array($billet,$billet2,$billet3,$billet4,$billet5,$billet6,$billet7,$billet8);

        return view('Reservation', ['billet' => $liste]);
    }

    public function reserver($id){

        $user = new Utilisateur(1,"baro@et.esiea.fr");
        $user1 = new Utilisateur(2,"hassanebaro@hotmail.com");

        if(isset($_SESSION['user']))
        {
           
            $session = unserialize($_SESSION['user']);
            foreach ($session->_reservation as $value) {
            
                array_push($user->_reservation,$value);
                array_push($user1->_reservation,$value);
            } 
              
        }
        
        if( $_COOKIE['utilisateur'] == "test@test.fr")
        {
            switch ($id) {

                case '1':
                     $billet = new Billet(1,"CDG","JFK",320);
                    
                     array_push($user->_reservation,$billet);
                     
                break;
                case '2':
                     $billet2 = new Billet(2,"CDG","JFK",500);
                     
                     array_push($user->_reservation,$billet2);
                     
                break;
                case '3':
                     $billet3 = new Billet(3,"DTW","JFK",350);
                    
                     array_push($user->_reservation,$billet3);
                     
                break;
                case '4':
                      $billet4 = new Billet(4,"DTW","JFK",1500);
                      
                      array_push($user->_reservation,$billet4);
                break;
                case '5':
                     $billet5 = new Billet(5,"JFK","DTW",500);
                     
                     array_push($user->_reservation,$billet5);  
                break;
                case '6':
                     $billet6 = new Billet(6,"CDG","DTW",200);
                   
                     array_push($user->_reservation,$billet6);
                     
                break;
                case '7':
                     $billet7 = new Billet(7,"DTW","CDG",700);
                     
                     array_push($user->_reservation,$billet7);
                     
                break;
                case '8':
                    $billet8 = new Billet(8,"JDK","DTW",300);
               
                    array_push($user->_reservation,$billet8);  
                break;
            }
            $_SESSION['user']= serialize($user);
            return redirect('ProgDistrib/billet');
            
        }
        else if( $_COOKIE['utilisateur'] == "test2@test2.fr")
        {
            switch ($id) {

                case '1':
                     $billet = new Billet(1,"CDG","JFK",320);
                     
                     array_push($user1->_reservation,$billet);    
                break;
                case '2':
                     $billet2 = new Billet(2,"CDG","JFK",500);
                   
                     array_push($user1->_reservation,$billet2); 
                break;
                case '3':
                     $billet3 = new Billet(3,"DTW","JFK",350);
                  
                     array_push($user1->_reservation,$billet3); 
                break;
                case '4':
                      $billet4 = new Billet(4,"DTW","JFK",1500);
                     
                      array_push($user->_reservation,$billet4);   
                break;
                case '5':
                     $billet5 = new Billet(5,"JFK","DTW",500);
                     
                     array_push($user->_reservation,$billet5);     
                break;
                case '6':
                     $billet6 = new Billet(6,"CDG","DTW",200);
                   
                     array_push($user->_reservation,$billet6);  
                break;
                case '7':
                     $billet7 = new Billet(7,"DTW","CDG",700);
                     
                     array_push($user->_reservation,$billet7);
                     
                break;
                case '8':
                    $billet8 = new Billet(8,"JDK","DTW",300);
                    
                    array_push($user->_reservation,$billet8);
                    
                break;
            }
            $_SESSION['user']= serialize($user1);
            return redirect('ProgDistrib/billet');
        }
        
    }

    public function showReservation(){
        return view('MesReservation');
    } 

    public function deco(){
        session_destroy();
        return view('index');
    }

}

?>
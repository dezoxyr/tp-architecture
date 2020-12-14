public class billet {
    private aeroport départ;
    private aeroport arrivé;
    private int prix;
    private reservation reservation;

    public billet(aeroport départ, aeroport arrivé, int prix)
    {
        this.départ= départ;
        this.arrivé=arrivé;
        this.prix=prix;
    }

    public billet(aeroport départ, aeroport arrivé, int prix, reservation reservation)
    {
        this.départ= départ;
        this.arrivé=arrivé;
        this.prix=prix;
        this.reservation =reservation;
    }

    public static void main(String[] args) {
        billet test = new billet(aeroport.CDG, aeroport.JFK, 400);
        System.out.println(test);
    }

    @Override
    public String toString() {
        return départ +
                "-" + arrivé + ' ' +prix ;
    }


}

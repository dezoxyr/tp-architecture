package Users;

import java.util.Random;

public class Billet {

    private String code_aller;
    private String code_retour;
    private int prix;
    private int id;

    public Billet (String code_aller, String code_retour, int prix){
        this.code_aller = code_aller;
        this.code_retour = code_retour;
        this.prix = prix;
        Random random = new Random();
        this.id = random.nextInt(1000);
    }

    public int getPrix() {
        return prix;
    }

    public void setPrix(int prix) {
        this.prix = prix;
    }

    public String getCode_aller() {
        return code_aller;
    }

    public void setCode_aller(String code_aller) {
        this.code_aller = code_aller;
    }

    public String getCode_retour() {
        return code_retour;
    }

    public void setCode_retour(String code_retour) {
        this.code_retour = code_retour;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        Random random = new Random();
        this.id = random.nextInt(1000);
    }

    /*
    public static void main(String[] args) {
        Billet billet = new Billet("NYC", "PAR", 800);
        String info = new String(billet.code_aller + "||" + billet.code_retour + "||" + billet.prix +"||" + billet.id);
        System.out.println(info);
    }
    */
}

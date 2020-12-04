package Users;

public class Utilisateur {

    private String mail;
    private Billets billets;

    public Utilisateur(String mail, Billets billets){
        this.mail = mail;
        this.billets = billets;
    }

    public Billets getBillets() {
        return billets;
    }
}

package Users;

import java.util.ArrayList;

public class Utilisateurs {

    private ArrayList<Utilisateur> users;

    public Utilisateurs(){}

    public Utilisateur getUserByName(String name){
        for (int i = 0;i < users.size(); i++){

        }
        return new Utilisateur(name, new Billets());
    }
}

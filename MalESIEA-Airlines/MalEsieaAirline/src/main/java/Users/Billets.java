package Users;

import java.util.ArrayList;

public class Billets {

    private ArrayList<Billet> billets;

    public Billets (){}

    public ArrayList<Billet> getBillets() {
        return billets;
    }

    public void addBillets(Billet new_billet){
        this.billets.add(new_billet);
    }

    public void delBillet(Billet billet){
        for (int j = 0; j<billets.size();j++){
            if (billet.getId() == billets.get(j).getId()){
                this.billets.remove(j);
            }
        }
    }
}

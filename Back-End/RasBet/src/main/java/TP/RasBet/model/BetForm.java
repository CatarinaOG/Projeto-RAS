package TP.RasBet.model;

public class BetForm{
    private int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    @Override
    public String toString() {
        return "" + this.id;
    }
}
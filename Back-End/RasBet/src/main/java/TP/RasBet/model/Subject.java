package TP.RasBet.model;


public interface Subject{

    public void registerObserver(User_follows_game ufg);
    public int removeObserver(User user);
    public void notifyObservers();

}
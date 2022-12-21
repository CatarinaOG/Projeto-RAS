package TP.RasBet.model;


public interface Subject{

    public void registerObserver(User user);
    public void removeObserver(User user);
    public void notifyObservers();

}
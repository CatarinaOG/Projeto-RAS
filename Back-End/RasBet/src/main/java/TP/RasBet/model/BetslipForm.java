package TP.RasBet.model;
import java.util.List;

public class BetslipForm{
    private String type;
    private int multipleAmount;
	private String user;
    private List<BetForm> bets;
    
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getMultipleAmount() {
		return multipleAmount;
	}
	public void setMultipleAmount(int multipleAmount) {
		this.multipleAmount = multipleAmount;
	}
	public List<BetForm> getBets() {
		return bets;
	}
	public void setBets(List<BetForm> bets) {
		this.bets = bets;
	}
	public String getUser() {
		return user;
	}


	public String toString(){
		return this.type + " | " + this.multipleAmount + " | " + this.bets.toString();
	}
}   
	

package TP.RasBet.model;
public class TransactionForm{

    private String operation;
    private int cardNum;
    private int cardCCV;
    private float operationValue;
    private String email_user;
    private String email;

    // getters 
    public String getOperation() {
        return operation;
    }
    public int getCardNum() {
        return cardNum;
    }
    public int getCardCCV() {
        return cardCCV;
    }
    public float getOperationValue() {
        return operationValue;
    }
    public String getEmail() {
        return email;
    }
    public String getEmail_user() {
        return email_user;
    }

    // setters
    public void setOperation(String operation) {
        this.operation = operation;
    }
    public void setCardNum(int cardNum) {
        this.cardNum = cardNum;
    }
    public void setCardCCV(int cardCCV) {
        this.cardCCV = cardCCV;
    }
    public void setOperationValue(float operationValue) {
        this.operationValue = operationValue;
    }
    public void setEmail(String email) {
        this.email = email;
    }
   public void setEmail_user(String email_user) {
       this.email_user = email_user;
   }
   @Override
   public String toString() {
       // TODO Auto-generated method stub
       return " | " + this.cardNum + " | " + this.cardCCV + " | " + this.operationValue + " | " + this.email_user + " | " + this.email + " | " + this.operation;
   }
}
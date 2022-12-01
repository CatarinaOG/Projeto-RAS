package TP.RasBet.model;

import javax.persistence.AttributeConverter;

import org.springframework.beans.factory.annotation.Autowired;

import TP.RasBet.components.EncryptionUtil;
/*
 

public class Encrypt implements AttributeConverter<String,String> {
    @Autowired
    EncryptionUtil encryptionUtil;
    
    @Override
    public String convertToDatabaseColumn(String s) {
        return encryptionUtil.encrypt(s);
    }
    
    @Override
    public String convertToEntityAttribute(String s) {
        return encryptionUtil.decrypt(s);
    }
}
*/
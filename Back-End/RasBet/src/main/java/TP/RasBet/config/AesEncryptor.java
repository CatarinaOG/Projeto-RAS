package TP.RasBet.config;

import java.io.Serializable;
import java.security.GeneralSecurityException;
import java.security.Key;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.persistence.AttributeConverter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.SerializationUtils;

import lombok.SneakyThrows;

@Configuration
public class AesEncryptor implements AttributeConverter<Object, String>{

    @Value("${aes.encryption.key}")
    private  String encriptionKey;
    
    private final String encryptioncipher = "AES";

    private static Key key;
    private static Cipher cipher;

    private Key getKey(){
        if (key == null){
            key = new SecretKeySpec(this.encriptionKey.getBytes(), this.encryptioncipher);
        }
        return key;
    }

    private Cipher getCipher() throws GeneralSecurityException{
        if(cipher == null){
            cipher = Cipher.getInstance(this.encryptioncipher);
        }
        return cipher;  
    }

    private void initCipher(int encriptionMode) throws GeneralSecurityException {
        this.getCipher().init(encriptionMode,this.getKey());
    }

    @SneakyThrows
    @Override
    public String convertToDatabaseColumn(Object attribute){
        if (attribute == null)
            return null;
        this.initCipher(Cipher.ENCRYPT_MODE);
        byte[] bytes = SerializationUtils.serialize(attribute);
        return Base64.getEncoder().encodeToString(this.getCipher().doFinal(bytes));
    }

    @SneakyThrows
    @Override
    public Object convertToEntityAttribute(String dbData) {
        if(dbData == null){
            return null;
        }
        this.initCipher(Cipher.DECRYPT_MODE);
        byte[] bytes = this.getCipher().doFinal(Base64.getDecoder().decode(dbData));
        return SerializationUtils.deserialize(bytes);
    }

 
    
}


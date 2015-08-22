package server.utils;

import ch.qos.logback.core.util.ExecutorServiceUtil;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.lang.reflect.Field;
import java.util.Map;
import server.spec.MessageSpec;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.Iterator;

/**
 * Created by nimrodoron on 8/20/15.
 */
public class MessageFactory {

    public static MessageSpec createEmptyMessage(String messageName) {
        try {
            Class<?> messageClass = Class.forName(messageName);
            Object object = messageClass.newInstance();
            ((MessageSpec)object).setMessageName(messageName);
            return (MessageSpec) object;
        }
        catch (Exception Ex) {
            return null;
        }
    }

    public static MessageSpec createMessage(String messgaeJson) {
        JsonObject jsonObject = null;
        Class<?> messageClass = null;
        JsonElement jsonElement = null;
        MessageSpec messageToReturn = null;
        try {
            Gson gson = new Gson();
            jsonObject = gson.fromJson(messgaeJson, JsonObject.class);

            for (Map.Entry<String, JsonElement> entry : jsonObject.entrySet()) {
                if ( "mType".equals(entry.getKey())) {
                    messageToReturn = createEmptyMessage(entry.getValue().getAsString());
                } else {
                    if (messageToReturn != null) {
                        set(messageToReturn, entry.getKey(), entry.getValue());
                    }
                }
            }
            return messageToReturn;
        }
        catch (Exception Ex) {
            return null;
        }

    }

    public static boolean set(Object object, String fieldName, JsonElement fieldValue) {
        Class<?> clazz = object.getClass();
        while (clazz != null) {
            try {
                Field field = clazz.getDeclaredField(fieldName);
                field.setAccessible(true);
                switch (field.getType().getName()) {
                    case ("int") :
                        field.set(object, fieldValue.getAsInt());
                        break;
                    case("Stinrg") :
                        field.set(object, fieldValue.getAsString());
                }
                return true;
            } catch (NoSuchFieldException e) {
                clazz = clazz.getSuperclass();
            } catch (Exception e) {
                throw new IllegalStateException(e);
            }
        }
        return false;
    }
}

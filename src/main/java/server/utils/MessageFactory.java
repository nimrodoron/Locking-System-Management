package server.utils;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.lang.reflect.Field;
import java.util.Map;

import server.domain.ACP_CLIENT_STATUS;
import server.domain.MODE;
import server.spec.MessageSpec;

/**
 * Created by nimrodoron on 8/20/15.
 */
public class MessageFactory {

    public static MessageSpec createEmptyMessage(String messageName) {
        try {
            Class<?> messageClass = Class.forName(messageName);
            Object object = messageClass.newInstance();
            ((MessageSpec)object).setmType(messageName);
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
                    case("java.lang.String") :
                        field.set(object, fieldValue.getAsString());
                        break;
                    case("server.domain.MODE") :
                        field.set(object, (MODE.valueOf(fieldValue.getAsString())));
                        break;
                    case("server.domain.ACP_CLIENT_STATUS") :
                        field.set(object, ACP_CLIENT_STATUS.valueOf(fieldValue.getAsString()));
                        break;
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

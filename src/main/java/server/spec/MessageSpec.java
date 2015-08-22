package server.spec;

import com.google.gson.Gson;

/**
 * Created by nimrodoron on 8/20/15.
 */
public abstract class MessageSpec {

    private String messageName;

    public String getMessageName() {
        return messageName;
    }

    public MessageSpec() {

    }

    public MessageSpec(String messageName) {
        this.messageName = messageName;
    }

    public void setMessageName(String messageName) {
        this.messageName = messageName;
    }

    public String toString() {
        String returnString = "{ mType : " + messageName;
        return returnString;
    }
}

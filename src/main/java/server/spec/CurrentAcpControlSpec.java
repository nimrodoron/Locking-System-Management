package server.spec;

import com.google.gson.Gson;
import server.domain.MODE;

/**
 * Created by nimrodoron on 8/22/15.
 */
public class CurrentAcpControlSpec extends MessageSpec {

    private int controlNumber;
    private MODE newMode;

    public CurrentAcpControlSpec() {}

    public int getControlNumber() {
        return controlNumber;
    }

    public void setControlNumber(int controlNumber) {
        this.controlNumber = controlNumber;
    }

    public MODE getNewMode() {
        return newMode;
    }

    public void setNewMode(MODE newMode) {
        this.newMode = newMode;
    }

    @Override
    public String toString() {
        String returnString = super.toString();
        returnString += " , controlNumber : " + getControlNumber() + " , newMode : " + getNewMode() + " }";
        return returnString;
    }
}

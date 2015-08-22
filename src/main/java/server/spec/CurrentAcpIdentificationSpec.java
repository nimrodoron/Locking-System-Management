package server.spec;

import server.domain.CurrentAcpStatus;

/**
 * Created by nimrodoron on 8/20/15.
 */
public class CurrentAcpIdentificationSpec extends MessageSpec {

    private int id;
    private String mac;
    private CurrentAcpStatus status;

    public CurrentAcpIdentificationSpec() {
        super.setMessageName("server.spec.CurrentAcpIdentificationSpec");
    }

    public int getId() {

        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMac() {
        return mac;
    }

    public void setMac(String mac) {
        this.mac = mac;
    }

    public CurrentAcpStatus getStatus() {
        return status;
    }

    public void setStatus(CurrentAcpStatus status) {
        this.status = status;
    }


}

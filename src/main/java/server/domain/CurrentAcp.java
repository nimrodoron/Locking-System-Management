package server.domain;

/**
 * Created by nimrodoron on 7/19/15.
 */
public class CurrentAcp {

    private Acp acp;
    private CurrentAcpInfo info;

    public Acp getAcp() {
        return acp;
    }

    public void setAcp(Acp acp) {
        this.acp = acp;
    }

    public CurrentAcpInfo getInfo() {

        return info;
    }

    public void setInfo(CurrentAcpInfo info) {
        this.info = info;
    }

    public CurrentAcp(Acp acp) {
        this.acp = acp;
    }


}

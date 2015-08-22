package server.domain;

/**
 * Created by nimrodoron on 7/19/15.
 */
public class CurrentAcp {

    private Acp acp;

    public Acp getAcp() {
        return acp;
    }

    public void setAcp(Acp acp) {
        this.acp = acp;
    }

    public CurrentAcp(Acp acp) {
        this.acp = acp;
    }

    public Integer getId() { return this.acp.getId(); }
}

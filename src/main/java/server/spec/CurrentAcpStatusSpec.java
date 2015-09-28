package server.spec;

import server.domain.MODE;

/**
 * Created by nimrodoron on 9/28/15.
 */
public class CurrentAcpStatusSpec extends MessageSpec {

    private int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public MODE getPort1() {
        return port1;
    }

    public void setPort1(MODE port1) {
        this.port1 = port1;
    }

    public MODE getPort2() {
        return port2;
    }

    public void setPort2(MODE port2) {
        this.port2 = port2;
    }

    public MODE getPort3() {
        return port3;
    }

    public void setPort3(MODE port3) {
        this.port3 = port3;
    }

    public MODE getPort4() {
        return port4;
    }

    public void setPort4(MODE port4) {
        this.port4 = port4;
    }

    private MODE port1;
    private MODE port2;
    private MODE port3;
    private MODE port4;
    private MODE port5;

    public MODE getPort5() {
        return port5;
    }

    public void setPort5(MODE port5) {
        this.port5 = port5;
    }
}

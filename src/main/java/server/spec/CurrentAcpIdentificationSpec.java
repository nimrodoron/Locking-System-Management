package server.spec;

import server.domain.MODE;

/**
 * Created by nimrodoron on 8/20/15.
 */
public class CurrentAcpIdentificationSpec extends MessageSpec {

    private int id;
    private String mac;
    private MODE port1;
    private MODE port2;
    private MODE port3;
    private MODE port4;

    public MODE getPort5() {
        return port5;
    }

    public void setPort5(MODE port5) {
        this.port5 = port5;
    }

    public MODE getPort4() {
        return port4;
    }

    public void setPort4(MODE port4) {
        this.port4 = port4;
    }

    public MODE getPort3() {
        return port3;
    }

    public void setPort3(MODE port3) {
        this.port3 = port3;
    }

    public MODE getPort2() {
        return port2;
    }

    public void setPort2(MODE port2) {
        this.port2 = port2;
    }

    public MODE getPort1() {
        return port1;
    }

    public void setPort1(MODE port1) {
        this.port1 = port1;
    }

    private MODE port5;

    public CurrentAcpIdentificationSpec() {
        super.setmType("server.spec.CurrentAcpIdentificationSpec");
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




}

package server.web;

import com.google.gson.Gson;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import server.domain.ACP_CLIENT_STATUS;
import server.domain.ACP_STATUS;
import server.domain.Acp;
import server.domain.MODE;
import server.spec.CurrentAcpControlSpec;
import server.spec.CurrentAcpIdentificationSpec;
import server.spec.CurrentAcpStatusSpec;
import server.utils.MessageFactory;

/**
 * Created by nimrodoron on 8/17/15.
 */
public class CurrentAcpClient {

    private final WebSocketSession session;


    public void setCurrentAcp(Acp currentAcp) {
        this.currentAcp = currentAcp;
    }

    public Acp getCurrentAcp() {
        return currentAcp;
    }

    private Acp currentAcp;


    public CurrentAcpClient(WebSocketSession session, Acp currentAcp) {
        this.session = session;
        this.currentAcp = currentAcp;
    }

    public void sendMessage(String msg) throws Exception {
       this.session.sendMessage(new TextMessage(msg));
    }

    public void SetCurrentAcpInfo(CurrentAcpIdentificationSpec messgae) {
        this.currentAcp.getPorts()[0] = messgae.getPort1();
        this.currentAcp.getPorts()[1] = messgae.getPort2();
        this.currentAcp.getPorts()[2] = messgae.getPort3();
        this.currentAcp.getPorts()[3] = messgae.getPort4();
        this.currentAcp.getPorts()[4] = messgae.getPort5();
        this.currentAcp.setACPCLIENTSTATUS(ACP_CLIENT_STATUS.ONLINE);
    }

    private String buildURL(CurrentAcpClient client) {
        return "http:// " + client.getCurrentAcp().getIp_addr();
    }

    public void setCurrentAcpStatus(CurrentAcpStatusSpec messageClass) {
        this.currentAcp.getPorts()[0] = messageClass.getPort1();
        this.currentAcp.getPorts()[1] = messageClass.getPort2();
        this.currentAcp.getPorts()[2] = messageClass.getPort3();
        this.currentAcp.getPorts()[3] = messageClass.getPort4();
        this.currentAcp.getPorts()[4] = messageClass.getPort5();
    }

    public void sendAcpAction(int acpId, int port, MODE mode) throws Exception {
        if (this.getCurrentAcp().getPorts()[port] != mode) {
            CurrentAcpControlSpec currentAcpControlSpec = (CurrentAcpControlSpec) MessageFactory.createEmptyMessage("server.spec.CurrentAcpControlSpec");
            currentAcpControlSpec.setControlNumber(port);
            currentAcpControlSpec.setNewMode(mode);
            Gson gson = new Gson();
            this.sendMessage(gson.toJson(currentAcpControlSpec).toString());
        }
    }
}

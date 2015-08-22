package server.web;

import org.omg.CORBA.Current;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import server.domain.Acp;
import server.domain.CurrentAcp;

/**
 * Created by nimrodoron on 8/17/15.
 */
public class CurrentAcpClient {

    private final WebSocketSession session;

    public CurrentAcp getCurrentAcp() {
        return currentAcp;
    }

    public void setCurrentAcp(CurrentAcp currentAcp) {
        this.currentAcp = currentAcp;
    }

    private CurrentAcp currentAcp;


    public CurrentAcpClient(WebSocketSession session, CurrentAcp currentAcp) {
        this.session = session;
        this.currentAcp = currentAcp;
    }

    public void sendMessage(String msg) throws Exception {
       this.session.sendMessage(new TextMessage(msg));
    }

/*    public void SetCurrentAcpInfo(CurrentAcp currentAcp) {
        String reponseString = requestInfo(currentAcp);
        if (reponseString != null) {
            currentAcp.setInfo(parse(reponseString));
        } else {
            CurrentAcpInfo info = new CurrentAcpInfo();
            info.setStatus(null);
            currentAcp.setInfo(info);
        }
    }

    private String requestInfo(CurrentAcp client) {
        return "";

    }

    private String buildURL(CurrentAcp client) {
        return "http:// " + client.getAcp().getIp_addr();
    }

    private CurrentAcpInfo parse(String reponseString) {
        return null;
    }*/
}

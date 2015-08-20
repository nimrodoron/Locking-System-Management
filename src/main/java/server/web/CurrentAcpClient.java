package server.web;

import org.springframework.web.socket.WebSocketSession;
import server.domain.Acp;

/**
 * Created by nimrodoron on 8/17/15.
 */
public class CurrentAcpClient {

    private final WebSocketSession session;
    private final Acp acp;

    public Acp getAcp() {
        return acp;
    }

    public CurrentAcpClient(WebSocketSession session, Acp client) {
        this.session = session;
        this.acp = client;
    }

    public void sendMessage(String msg) throws Exception {

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

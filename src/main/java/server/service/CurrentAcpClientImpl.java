package server.service;

import org.springframework.stereotype.Service;
import server.domain.CurrentAcp;
import server.domain.CurrentAcpInfo;

/**
 * Created by nimrodoron on 8/17/15.
 */
@Service
public class CurrentAcpClientImpl implements CurrentAcpClient {

    public void SetCurrentAcpInfo(CurrentAcp currentAcp) {
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
    }
}

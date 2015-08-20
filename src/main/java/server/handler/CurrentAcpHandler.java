package server.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import server.domain.Acp;
import server.repository.AcpRepository;
import server.web.CurrentAcpClient;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by nimrodoron on 8/20/15.
 */
public class CurrentAcpHandler extends TextWebSocketHandler {

    @Autowired
    AcpRepository acpRepository;

    private final int id = 0;
    private CurrentAcpClient currentAcpClient;
    private static final ConcurrentHashMap<Integer, CurrentAcpClient> acpClients = new ConcurrentHashMap<Integer, CurrentAcpClient>();


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        Acp acp = new Acp();
        acp.setId(1);
        this.currentAcpClient = new CurrentAcpClient(session, new Acp());
        acpClients.put(Integer.valueOf(currentAcpClient.getAcp().getId()),this.currentAcpClient);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
            throws Exception {
        acpClients.remove(Integer.valueOf(currentAcpClient.getAcp().getId()));
    }
}

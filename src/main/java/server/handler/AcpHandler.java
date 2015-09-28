package server.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import server.domain.Acp;
import server.service.AcpService;
import server.spec.CurrentAcpIdentificationSpec;
import server.spec.CurrentAcpStatusSpec;
import server.spec.MessageSpec;
import server.utils.MessageFactory;
import server.web.CurrentAcpClient;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by nimrodoron on 8/20/15.
 */
@Component
public class AcpHandler extends TextWebSocketHandler {

    private static final long IDENTIFY_TIME = 3000;

    @Autowired
    AcpService acpService;

    // TODO add logger and write to log on excpetions

    private final int id = 0;
    private CurrentAcpClient currentAcpClient;
    private WebSocketSession session;
    private static Timer identifyTimer;
    private static final ConcurrentHashMap<Integer, CurrentAcpClient> acpClients = new ConcurrentHashMap<Integer, CurrentAcpClient>();
    private static final ConcurrentHashMap<String, Integer> acpClientsSessions = new ConcurrentHashMap<>();

    public static List<Acp> getAllAcpsOfClients() {
        List<Acp> acps = new ArrayList<>();
        for(Map.Entry<Integer, CurrentAcpClient> entry : acpClients.entrySet()) {
            acps.add(entry.getValue().getCurrentAcp());
        }
        return acps;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        this.session = session;
        //HttpHeaders headers = session.getHandshakeHeaders();
        //String macAddr = headers.get("X-Mac-Addr").get(0);



        // TODO check if relevant parmeters can be sent on session start instead for waiting to identification
/*         identifyTimer = new Timer(AcpHandler.class.getSimpleName() + " Identify Timer");
        try {
            //identifyTimedOut();
        }
        catch (Throwable ex) {
            //log.error("Caught to prevent timer from shutting down", ex);
        }*/
    }

    private void identifyTimedOut()  {
        try {
            session.close(CloseStatus.NOT_ACCEPTABLE);
        }
        catch (Exception Ex) {
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)
            throws Exception {
        String payload = message.getPayload();
        MessageSpec messageClass = MessageFactory.createMessage(payload);
        if (messageClass instanceof CurrentAcpIdentificationSpec) {
            handleCurentAcpIdentificationSpec(session, (CurrentAcpIdentificationSpec)messageClass);
        }
        else if (messageClass instanceof CurrentAcpStatusSpec) {
            HandleCurrentAcpStatusSpec(session, (CurrentAcpStatusSpec)messageClass);
        }
    }

    private void HandleCurrentAcpStatusSpec(WebSocketSession session, CurrentAcpStatusSpec messageClass) {
        CurrentAcpClient acpClient = getCurrentAcpClientById(messageClass.getId());
        if (acpClient != null) {
            acpClient.setCurrentAcpStatus(messageClass);
        }
    }

    public synchronized CurrentAcpClient getCurrentAcpClientById(int id) {
        Integer key = Integer.valueOf(id);
        if (acpClients.containsKey(key)) {
            return acpClients.get(key);
        }
        return null;
    }

    private synchronized void handleCurentAcpIdentificationSpec(WebSocketSession session, CurrentAcpIdentificationSpec messageClass) throws IOException {
        // TODO Change the IP Address to be taken from the session and add to if condition
        Acp acp = acpService.findOneById(messageClass.getId());
        if (acp != null && messageClass.getMac().equals(acp.getMac())) {
            CurrentAcpClient client = new CurrentAcpClient(this.session, acp);
            acpClientsSessions.put(session.getId(), Integer.valueOf(acp.getId()));
            acpClients.put(Integer.valueOf(acp.getId()), client);
            client.SetCurrentAcpInfo(messageClass);
        }
        else {
            session.close();
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        try {
            removeCurrentAcp(acpClientsSessions.get(session.getId()));
            acpClientsSessions.remove(session.getId());
        } catch (Exception Ex) {}
    }

    private synchronized void removeCurrentAcp(int currentAcpId) {
        Integer id = Integer.valueOf(currentAcpId);
        if (acpClients.containsKey(id))
            acpClients.remove(id);
    }
}

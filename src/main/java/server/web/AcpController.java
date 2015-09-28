package server.web;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import server.domain.Acp;
import server.domain.MODE;
import server.handler.AcpHandler;
import server.service.AcpService;
import server.spec.CurrentAcpControlSpec;
import server.utils.MessageFactory;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by nimrodoron on 8/22/15.
 */
@RestController
public class AcpController {

    @Autowired
    AcpHandler acpHandler;

    @Autowired
    AcpService acpService;

    @RequestMapping("/getAllAcps")
    public List<Acp> getAllAcps() {

        List<Acp> allacps = new ArrayList<>();

        // Get all acps from DB
        Collection<Acp> acps = acpService.getAllAcps();

        for (Acp acp : acps) {
            CurrentAcpClient acpClient = acpHandler.getCurrentAcpClientById(acp.getId());
            if (acpClient != null) {
                allacps.add(acpClient.getCurrentAcp());
            } else {
                allacps.add(acp);
            }
        }
        return allacps;
    }

    @RequestMapping("/getAllActiveAcps")
    public List<Acp> getAllActiveAcps() {
        return acpHandler.getAllAcpsOfClients();
    }

    @RequestMapping("/acpAction")
    public void openAcpControl(@RequestParam(value="acpId") int acpId,
                               @RequestParam(value="port") int port,
                               @RequestParam(value="portStatus") String portStatus)
                    throws Exception {

        MODE mode = MODE.valueOf(portStatus);
        CurrentAcpClient currentAcpClient = acpHandler.getCurrentAcpClientById(acpId);
        currentAcpClient.sendAcpAction(acpId, port, mode);
    }
}

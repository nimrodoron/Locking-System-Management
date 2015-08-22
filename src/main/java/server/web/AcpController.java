package server.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import server.domain.MODE;
import server.handler.CurrentAcpHandler;
import server.spec.CurrentAcpControlSpec;
import server.utils.MessageFactory;

import java.util.Date;
import java.util.Map;

/**
 * Created by nimrodoron on 8/22/15.
 */
@RestController
public class AcpController {

    @Autowired
    CurrentAcpHandler currentAcpHandler;

    @RequestMapping("/on")
    public void openAcpControl(@RequestParam(value="acpId") int acpId,
                               @RequestParam(value="controlId") int controlId) throws Exception {
        CurrentAcpClient currentAcpClient = currentAcpHandler.getCurrentAcpClientById(acpId);
        // TODO - check currnetAcp to status on the control
        CurrentAcpControlSpec currentAcpControlSpec = (CurrentAcpControlSpec) MessageFactory.createEmptyMessage("server.spec.CurrentAcpControlSpec");
        currentAcpControlSpec.setControlNumber(controlId);
        currentAcpControlSpec.setNewMode(MODE.OPEN);
        currentAcpClient.sendMessage(currentAcpControlSpec.toString());
    }

    @RequestMapping("/off")
    public void closeAcpControl(@RequestParam(value="acpId") int acpId,
                               @RequestParam(value="controlId") int controlId) throws Exception {
        CurrentAcpClient currentAcpClient = currentAcpHandler.getCurrentAcpClientById(acpId);
        // TODO - check currnetAcp to status on the control
        CurrentAcpControlSpec currentAcpControlSpec = (CurrentAcpControlSpec) MessageFactory.createEmptyMessage("server.spec.CurrentAcpControlSpec");
        currentAcpControlSpec.setControlNumber(controlId);
        currentAcpControlSpec.setNewMode(MODE.CLOSE);
        currentAcpClient.sendMessage(currentAcpControlSpec.toString());
    }

}

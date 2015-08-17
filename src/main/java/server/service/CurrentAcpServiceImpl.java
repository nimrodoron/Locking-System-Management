package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import server.domain.Acp;
import server.domain.CurrentAcp;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by nimrodoron on 7/19/15.
 */
@Service
public class CurrentAcpServiceImpl implements CurrentAcpService{

    private Map<Integer,CurrentAcp> acps = null;

    @Autowired
    private AcpService acpService;

    @Autowired
    private CurrentAcpClient currentAcpClient;

    @Override
    public void InitAcpMap() {

        this.acps = new HashMap<>();
        Collection<Acp> acpCol = acpService.getAllAcps();

    }

    @Scheduled(fixedRate = 5000)
    public void Run() {
        if (acps == null) {
            Collection<Acp> coll = acpService.getAllAcps();
            for (Acp ac : coll) {
                this.acps = new HashMap<>();
                this.acps.put(ac.getId(),new CurrentAcp(ac));
            }
        }
        for (Map.Entry<Integer,CurrentAcp> entry : acps.entrySet())
        {
            currentAcpClient.SetCurrentAcpInfo(entry.getValue());
        }

    }
}

package server.service;

import server.domain.CurrentAcp;
import server.domain.CurrentAcpInfo;

/**
 * Created by nimrodoron on 8/17/15.
 */
public interface CurrentAcpClient {
    public void SetCurrentAcpInfo(CurrentAcp currentAcp);
}

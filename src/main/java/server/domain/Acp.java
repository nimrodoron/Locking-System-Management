package server.domain;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by nimrodoron on 7/19/15.
 */
@Entity
@Table(name = "acp")
public class Acp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private int id;

    @Column(name = "ip_addr", nullable = true, unique = true)
    private String ip_addr;

    @Column(name = "enabled", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private ACP_STATUS enabled;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "lat")
    private Double lat;

    @Column(name = "lon")
    private Double lon;

    @Column(name = "mac", nullable = false)
    private String mac;

    private transient UpdateTimestamp timeStamp = null;

    private transient MODE[] ports = {MODE.CLOSE,MODE.CLOSE,MODE.CLOSE,MODE.CLOSE,MODE.CLOSE};

    @Transient
    public UpdateTimestamp getTimeStamp() {
        return timeStamp;
    }

    @Transient
    public void setTimeStamp(UpdateTimestamp timeStamp) {
        this.timeStamp = timeStamp;
    }

    @Transient
    public MODE[] getPorts() {
        return ports;
    }

    @Transient
    public void setPorts(MODE[] ports) {
        this.ports = ports;
    }

    private transient ACP_CLIENT_STATUS ACPCLIENTSTATUS = ACP_CLIENT_STATUS.OFFLINE;

    @Transient
    public ACP_CLIENT_STATUS getACPCLIENTSTATUS() {
        return ACPCLIENTSTATUS;
    }

    @Transient
    public void setACPCLIENTSTATUS(ACP_CLIENT_STATUS ACPCLIENTSTATUS) {
        this.ACPCLIENTSTATUS = ACPCLIENTSTATUS;
    }

    public String getMac() {
        return mac;
    }

    public void setMac(String mac) {
        this.mac = mac;
    }

    public Double getLon() {
        return lon;
    }

    public void setLon(Double lon) {
        this.lon = lon;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ACP_STATUS getEnabled() {
        return enabled;
    }

    public void setEnabled(ACP_STATUS enabled) {
        this.enabled = enabled;
    }

    public String getIp_addr() {
        return ip_addr;
    }

    public void setIp_addr(String ip_addr) {
        this.ip_addr = ip_addr;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

}

package server.domain;

import javax.persistence.*;

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
    private Status enabled;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "lat")
    private Long lat;

    public Long getLon() {
        return lon;
    }

    public void setLon(Long lon) {
        this.lon = lon;
    }

    public Long getLat() {
        return lat;
    }

    public void setLat(Long lat) {
        this.lat = lat;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Status getEnabled() {
        return enabled;
    }

    public void setEnabled(Status enabled) {
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

    @Column(name = "lon")
    private Long lon;

}

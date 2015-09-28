package server.spec;

/**
 * Created by nimrodoron on 8/20/15.
 */
public abstract class MessageSpec {

    private String mType;

    public String getmType() {
        return mType;
    }

    public MessageSpec() {

    }

    public MessageSpec(String mType) {
        this.mType = mType;
    }

    public void setmType(String mType) {
        this.mType = mType;
    }

}

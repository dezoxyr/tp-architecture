package classes;

public class Airport {
    private String name;
    private String code;


    public Airport(String name, String code) {
        this.name = name;
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
    }

    @Override
    public String toString() {
        return '['+code+']'+name;
    }
}

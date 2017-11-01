package entity;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 *
 * @author thomasthimothee
 */

@Entity(name = "PLACE")
public class Place implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    private Address address;

    public Place(Address address, String description, HashMap<String, Double> ratings, List<String> images) {
        this.address = address;
        this.description = description;
        this.ratings = ratings;
        this.images = images;
    }

    private String description;

    private HashMap<String, Double> ratings;

    private List<String> images;
    
    public Place() {
        this.ratings = new HashMap();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Address getAddress() {
        return address;
    }

    public String getDescription() {
        return description;
    }

    public HashMap<String, Double> getRatings() {
        return ratings;
    }

    public List<String> getImages() {
        return images;
    }

}

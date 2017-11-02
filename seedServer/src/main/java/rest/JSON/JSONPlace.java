/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest.JSON;

import entity.Address;
import entity.Place;
import entity.User;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Lovro
 */
public class JSONPlace {

    private Address address;
    private String description;
    private List<String> images;
    private HashMap<String, Double> ratings;
    private int rating;

    public JSONPlace(Place place) {
        this.address = place.getAddress();
        this.description = place.getDescription();
        this.images = place.getImages();
        this.ratings = place.getRatings();
        this.rating = calculateRating();
    }

    private int calculateRating() {
        int sum = 0;
        int count = 0;
        for (Double value : ratings.values()) {
            sum += value;
            count++;
        }
        return sum / count;
    }

    public Address getAddress() {
        return address;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getImages() {
        return images;
    }

    public HashMap<String, Double> getRatings() {
        return ratings;
    }

    public int getRating() {
        return rating;
    }

}

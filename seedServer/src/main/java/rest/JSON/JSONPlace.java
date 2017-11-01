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

    public JSONPlace(Place place) {
        this.address = place.getAddress();
        this.description = place.getDescription();
        this.images = place.getImages();
        this.ratings = place.getRatings();
    }
}

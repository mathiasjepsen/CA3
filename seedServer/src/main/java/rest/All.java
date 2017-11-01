package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.Place;
import facades.UserFacade;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import rest.JSON.JSONPlace;
import rest.JSON.JSONUser;
import security.IUser;
import security.PasswordStorage;

/**
 * REST Web Service
 *
 * @author plaul1
 */
@Path("all")
public class All {

    UserFacade uf = new UserFacade(Persistence.createEntityManagerFactory("pu_development"));
    private static Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getSomething() {
        return "{\"message\" : \"Hello User from Server (Accesible by only authenticated USERS)\"}";
    }
    @GET
    @Path("places")
    @Produces(MediaType.APPLICATION_JSON)
    public String getPlaces() {
       List<JSONPlace> jsonPlace = new ArrayList();
       List<Place> places = uf.getAllPlaces();
       for(Place place: places) {
           JSONPlace newPlace = new JSONPlace(place);
           jsonPlace.add(newPlace);
       }
       return gson.toJson(jsonPlace);
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String register(String content) throws PasswordStorage.CannotPerformOperationException {
        IUser user = uf.register(gson.fromJson(content, entity.User.class));
        JSONUser jsonUser = new JSONUser(user);
        return gson.toJson(jsonUser);
    }

}

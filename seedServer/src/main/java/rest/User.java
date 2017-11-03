package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.Place;
import facades.UserFacade;
import javax.annotation.security.RolesAllowed;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import rest.JSON.JSONPlace;

@Path("user")
@RolesAllowed("User")
public class User {
  UserFacade uf = new UserFacade(Persistence.createEntityManagerFactory("pu_development"));
    private static Gson gson = new GsonBuilder().setPrettyPrinting().create();
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getSomething() {
        return "{\"message\" : \"Hello User from Server (Accesible by only authenticated USERS)\"}";
    }
      @POST
    @Path("createlocation")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String createLocation(String content) {
          System.out.println("content:" + content);
        Place place = uf.createLocation(gson.fromJson(content, entity.Place.class));
        JSONPlace jsonPlace = new JSONPlace(place);
        return gson.toJson(jsonPlace);
    }
}

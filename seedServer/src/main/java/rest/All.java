package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import facades.UserFacade;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
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

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String register(String content) throws PasswordStorage.CannotPerformOperationException {
        IUser user = uf.register(gson.fromJson(content, entity.User.class));
        JSONUser jsonUser = new JSONUser(user);
        return gson.toJson(jsonUser);
    }

}

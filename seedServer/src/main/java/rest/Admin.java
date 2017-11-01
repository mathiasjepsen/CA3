package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.Role;
import facades.AdminFacade;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import rest.JSON.JSONUser;
import security.IUser;
import security.PasswordStorage;

@Path("admin")
@RolesAllowed("Admin")
public class Admin {

    AdminFacade af = new AdminFacade(Persistence.createEntityManagerFactory("pu_development"));
    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @GET
    @Path("allUsers")
    @Produces(MediaType.APPLICATION_JSON)
    public String getUsers() {
        List<JSONUser> jsonUsers = new ArrayList();
        List<IUser> users = af.getUsers();

        for (IUser user : users) {
            JSONUser u = new JSONUser(user);
            jsonUsers.add(u);
        }

        return gson.toJson(jsonUsers);
    }

    @DELETE
    @Path("{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public String deleteUser(@PathParam("username") String username) {
        af.deleteUser(username);
        return "{\"message\" : \"Deleted user: " + username + "\"}";
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String editUser(String content) throws PasswordStorage.CannotPerformOperationException {
        JSONUser user = af.editUser(gson.fromJson(content, entity.User.class));
        return gson.toJson(user);
    }

    @POST
    @Path("user")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String addUser(String content) throws PasswordStorage.CannotPerformOperationException {
        IUser user = af.addUser(gson.fromJson(content, entity.User.class));
        JSONUser jsonUser = new JSONUser(user);
        return gson.toJson(jsonUser);
    }
    
}

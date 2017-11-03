package facades;

import entity.Place;
import entity.Role;
import security.IUserFacade;
import entity.User;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.core.Response;
import rest.JSON.JSONPlace;
import rest.JSON.JSONUser;
import security.IUser;
import security.PasswordStorage;

public class UserFacade implements IUserFacade {

    EntityManagerFactory emf;

    public UserFacade(EntityManagerFactory emf) {
        this.emf = emf;
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    @Override
    public IUser getUserByUserId(String id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(User.class, id);
        } finally {
            em.close();
        }
    }

    @Override
    public List<Place> getAllPlaces() {
        EntityManager em = getEntityManager();
        try {
            Query q = em.createQuery("SELECT p from PLACE p");
            List<Place> places = q.getResultList();
            return places;
        } finally {
            em.close();
        }
    }

    public IUser registerUser(User user) throws PasswordStorage.CannotPerformOperationException {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            Role existingRole = em.find(Role.class, "User");
            user.createPasswordHash(user.getPasswordHash());
            user.addRole(existingRole);
            em.persist(user);
            em.getTransaction().commit();
            return user;
        } finally {
            em.close();
        }
    }

    public IUser registerAdmin(User admin) throws PasswordStorage.CannotPerformOperationException {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            Role existingRole = em.find(Role.class, "Admin");
            admin.createPasswordHash(admin.getPasswordHash());
            admin.addRole(existingRole);
            em.persist(admin);
            em.getTransaction().commit();
            return admin;
        } finally {
            em.close();
        }
    }

    /*
  Return the Roles if users could be authenticated, otherwise null
     */
    @Override
    public List<String> authenticateUser(String userName, String password) {
        try {
            System.out.println("User before: " + userName + " " +password);
            IUser user = getUserByUserId(userName);
            System.out.println("User after: " + userName + " " +user.getPasswordHash());
            return user != null && PasswordStorage.verifyPassword(password, user.getPasswordHash()) ? user.getRolesAsStrings() : null;
        } catch (PasswordStorage.CannotPerformOperationException | PasswordStorage.InvalidHashException ex) {
            throw new NotAuthorizedException("Invalid username or password", Response.Status.FORBIDDEN);
        }
    }

    public Place getPlace(Integer id) {
         EntityManager em = getEntityManager();
         System.out.println("id passed down"+ id);
        try {
            Query q = em.createQuery("SELECT p from PLACE p where p.id = :Id");
            q.setParameter("Id", id);
            Place place = (Place) q.getSingleResult();
            return place;
        } finally {
            em.close();
        }
    }

    public JSONPlace addRate(Place editedPlace) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            Place oldPlace = em.find(Place.class, editedPlace.getId());
            oldPlace.setRatings(editedPlace.getRatings());
            em.getTransaction().commit();
            JSONPlace newPlace = new JSONPlace(oldPlace);
            return newPlace;
        } finally {
            em.close();
        }
    }

}

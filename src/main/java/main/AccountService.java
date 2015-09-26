package main;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by v.chibrikov on 13.09.2014.
 */
public class AccountService {
    private Map<String, UserProfile> users = new HashMap<>();
    private Map<String, UserProfile> sessions = new HashMap<>();

    public boolean checkUser(String userName){
       if(users.containsKey(userName))
           return true;
       return false;
    }

    public boolean addUser(String userName, UserProfile userProfile) {
        if (users.containsKey(userName))
            return false;
        users.put(userName, userProfile);
        return true;
    }

    public boolean checkSeassions(String sessionId){
        if (!sessions.containsKey(sessionId))
            return false;
        return true;
    }

   public boolean removeSeassions(String sessionId){
       if (!sessions.containsKey(sessionId))
           return false;
       sessions.remove(sessionId);
       return true;
   }
    public void addSessions(String sessionId, UserProfile userProfile) {
        sessions.put(sessionId, userProfile);
    }

    public UserProfile getCurrentUser(String sessionId){
        return sessions.get(sessionId);
    }

    public UserProfile getUser(String userName) {
        return users.get(userName);
    }

    public String UserSession(String sessionId) {
        if (!sessions.containsKey(sessionId))
            return "";
        return sessions.get(sessionId).getLogin();
    }
    public UserProfile getSessions(String sessionId) {
        return sessions.get(sessionId);
    }
}

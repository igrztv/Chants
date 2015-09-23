package frontend;

import main.AccountService;
import main.UserProfile;
import templater.PageGenerator;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.io.PrintWriter;

/**
 * Created by v.chibrikov on 13.09.2014.
 */
public class SignUpServlet extends HttpServlet {
    private AccountService accountService;

    public SignUpServlet(AccountService accountService) {
        this.accountService = accountService;
    }
    Map<String, Object> pageVariables = new HashMap<>();

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {
        System.out.println("Post");
        String name = request.getParameter("name");
        String password = request.getParameter("password");
        String email = request.getParameter("email");
        Map<String, Object> pageVariables = new HashMap<>();
        if (accountService.addUser(name, new UserProfile(name, password, ""))) {
            pageVariables.put("name", name == null ? "" : name);
            pageVariables.put("password", password == null ? "" : password);
            pageVariables.put("email", email == null ? "" : email);
            pageVariables.put("signup_status", "New user created name: " + name);
            System.out.println("New user created name: " + name);

        } else {
            pageVariables.put("name", name == null ? "" : name);
            pageVariables.put("password", password == null ? "" : password);
            pageVariables.put("email", email == null ? "" : email);
            pageVariables.put("signup_status", "User with name: " + name + " already exists");
            System.out.println("User with name: " + name + " already exists");
        }
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().println(PageGenerator.getPage("signupresponse.txt", pageVariables));

    }
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException, IOException {
        System.out.println("Get");
        String name = request.getParameter("name");
        String password = request.getParameter("password");
        Map<String, Object> pageVariables = new HashMap<>();
        pageVariables.put("signUpStatus", "");
        response.getWriter().println(PageGenerator.getPage("signupstatus.html", pageVariables));
        response.setStatus(HttpServletResponse.SC_OK);
    }


   /* public void doGet(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException, IOException {
        String name = request.getParameter("name");
        String password = request.getParameter("password");

        Map<String, Object> pageVariables = new HashMap<>();
        if (accountService.addUser(name, new UserProfile(name, password, ""))) {
            pageVariables.put("signUpStatus", "New user created");
        } else {
            pageVariables.put("signUpStatus", "User with name: " + name + " already exists");
        }

       // response.getWriter().println(PageGenerator.getPage("signupstatus.html", pageVariables));
        response.getWriter().println(PageGenerator.getPage("signup.html", pageVariables));
        response.setStatus(HttpServletResponse.SC_OK);
    }
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException, IOException {
        String name = request.getParameter("name");
        String password = request.getParameter("password");

        Map<String, Object> pageVariables = new HashMap<>();
        if (accountService.addUser(name, new UserProfile(name, password, ""))) {
            pageVariables.put("signUpStatus", "New user created");
        } else {
            pageVariables.put("signUpStatus", "User with name: " + name + " already exists");
        }


        // response.getWriter().println(PageGenerator.getPage("signupstatus.html", pageVariables));
        response.getWriter().println(PageGenerator.getPage("signup.html", pageVariables));
        response.setStatus(HttpServletResponse.SC_OK);
    }*/

}

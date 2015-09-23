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
import javax.servlet.Servlet;

/**
 * @author v.chibrikov
 */
public class SignInServlet extends HttpServlet {
    private AccountService accountService;
    public SignInServlet(AccountService accountService) {
        this.accountService = accountService;
    }
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException, IOException {
      //  String name = request.getParameter("name");
      //  String password = request.getParameter("password");
///////////////////////////////////////////////////////////////////////
    //    System.out.println(name);
    //    System.out.println(password);
        System.out.println("Get");
///////////////////////////////////////////////////////////////////////

        response.setStatus(HttpServletResponse.SC_OK);
        Map<String, Object> pageVariables = new HashMap<>();
  //      UserProfile profile = accountService.getUser(name);
  //      if (profile != null && profile.getPassword().equals(password)) {
  //          pageVariables.put("loginStatus", "Login passed");

////////////////////////////////////////////////////////////////////
   //         System.out.println("Login passed");
////////////////////////////////////////////////////////////////////

   //     } else {
   //         pageVariables.put("loginStatus", "Wrong login/password");

////////////////////////////////////////////////////////////////
   //         System.out.println("Wrong login/password");
///////////////////////////////////////////////////////////////

   //     }
        if (accountService.checkSeassions(request.getRequestedSessionId())) {
            System.out.println("tut");
            UserProfile userProfile = accountService.getCurrentUser(request.getRequestedSessionId());
            String name = userProfile.getLogin();
            String password = userProfile.getPassword();
            pageVariables.put("name", name == null ? "" : name);
            pageVariables.put("password", password == null ? "" : password);
            pageVariables.put("login_status", "login");
            response.getWriter().println(PageGenerator.getPage("authresponse.txt", pageVariables));
        }
        else {
            System.out.println("ne tut");
            response.getWriter().println(PageGenerator.getPage("authstatus.html", pageVariables));
        }
       // response.getWriter().println(PageGenerator.getPage("index.html", pageVariables));
    }

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {

        String name = request.getParameter("name");
        String password = request.getParameter("password");
        response.setStatus(HttpServletResponse.SC_OK);
        Map<String, Object> pageVariables = new HashMap<>();
        UserProfile profile = accountService.getUser(name);
        if (accountService.checkSeassions(request.getRequestedSessionId())) {
            if (profile != null && profile.getPassword().equals(password)) {
                //  pageVariables.put("loginStatus", "Login passed");
                pageVariables.put("name", name == null ? "" : name);
                pageVariables.put("password", password == null ? "" : password);
                pageVariables.put("login_status", "sucsess");
                System.out.println("Login passed");
                request.setAttribute("user", profile);
                System.out.println(request.getAttribute("user"));
                accountService.addSessions(request.getRequestedSessionId(), profile);
            } else {
                // pageVariables.put("loginStatus", "Wrong login/password");
                pageVariables.put("name", name == null ? "" : name);
                pageVariables.put("password", password == null ? "" : password);
                pageVariables.put("login_status", "wrong");
                //response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                System.out.println("Wrong login/password");
            }
        }
        else{
            pageVariables.put("name", name == null ? "" : name);
            pageVariables.put("password", password == null ? "" : password);
            pageVariables.put("login_status", "login");
            //response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            System.out.println("Wrong login_user");
        }
        response.getWriter().println(PageGenerator.getPage("authresponse.txt", pageVariables));
        //response.getWriter().println(PageGenerator.getPage("signin.html", pageVariables));
       // response.setStatus(HttpServletResponse.SC_OK);
    }
}

import { supabase } from "./config";
import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";

export default function GetSession() {
  const location = useLocation();
  const navigate = useNavigate();

  const sessioncall = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      const currentPath = location.pathname;
      const authPages = ["/signup", "/"];
      const isAuthPage = authPages.includes(currentPath);
      const isAdminDashboard = currentPath === "/admindashboard";
      const isAdmin = session?.user?.user_metadata?.email === "alikhancss27@gmail.com";

      if (session) {
        if (isAdmin) {
          if (!isAdminDashboard) {
            navigate("/admindashboard");
          }
        } else {
          if (isAdminDashboard) {
            navigate("/dashboard");
          } else if (isAuthPage) {
            navigate("/dashboard");
          }
        }
      } else {
        if (!isAuthPage) {
          navigate("/");
        }
      }

    } catch (error) {
      console.error("Session check failed", error);
    }
  };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        sessioncall();
        console.log('User signed in!', session);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

 
  useEffect(() => {
    sessioncall();
  }, [location.pathname]);

  return null;
}

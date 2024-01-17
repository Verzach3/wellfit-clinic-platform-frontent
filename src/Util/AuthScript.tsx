import {useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

function AuthScript() {
  const navigate = useNavigate();
  const [pathname, setPathname] = useState<string | null>(null);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/auth") {
      setPathname(location.pathname);
    }

    window.supabase.auth.getSession().then(({data: {session}}) => {
      if (!session) {
        navigate("/auth");
      }
    });

    const {
      data: {subscription},
    } = window.supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate(pathname ?? "/");
        console.log("logged in", pathname)
      } else {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [location.pathname, navigate, pathname]);
  return <Outlet/>;
}

export default AuthScript;

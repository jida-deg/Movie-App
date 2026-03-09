import { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import AuthContext from "../components/AuthProvider";

export default function GoogleSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setUser, setToken, fetchNotifications, API_BASE } = useContext(AuthContext);

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      setToken(token);

      fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
            fetchNotifications(token);
            navigate("/moviespage");
          } else {
            // if something went wrong, bounce back to signin
            navigate("/signin");
          }
        })
        .catch(() => {
          // network/error case
          navigate("/signin");
        });
    }
  }, []);

  return <h2>Logging you in with Google...</h2>;
}
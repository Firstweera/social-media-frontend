import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { checkAuthentication } from ".";
import { AuthContext } from "../App";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthen, setIsAuthen } = useContext(AuthContext);

  useEffect(() => {
    checkAuthentication(setIsAuthen);
  }, [location.pathname]);

  useEffect(() => {
    if (!isAuthen) {
      navigate("/login");
    }
  }, [isAuthen, navigate]);

  return null;
};

export default ProtectedRoute;

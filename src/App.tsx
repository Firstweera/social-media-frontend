import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Home, MainFeed, ProfilePage, SignInCard, SignUpCard } from "./pages";
import { Nav } from "./components";
import { Dispatch, createContext, useEffect, useState } from "react";
import React from "react";
import { checkAuthentication } from "./hooks";

export const AuthContext = createContext({
  isAuthen: false,
  setIsAuthen: (() => {}) as Dispatch<React.SetStateAction<boolean>>,
});

const ProtectedRoute = ({
  isAuthen,
  redirectPath,
}: {
  isAuthen: boolean;
  redirectPath: string;
}) => {
  if (!isAuthen) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

function App() {
  const token = localStorage.getItem("token");
  const [isAuthen, setIsAuthen] = useState(token ? true : false);
  const queryClient = new QueryClient();

  console.log("isAuthen out", isAuthen);

  useEffect(() => {
    console.log("isAuthen in", isAuthen);

    checkAuthentication();
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ isAuthen, setIsAuthen }}>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUpCard />} />
            <Route path="/login" element={<SignInCard />} />
            <Route
              element={
                <ProtectedRoute isAuthen={isAuthen} redirectPath={"/"} />
              }
            >
              <Route path="/main" element={<MainFeed />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<>404: Page not found</>} />
          </Routes>
        </AuthContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

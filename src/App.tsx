import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Home, MainFeed, ProfilePage, SignInCard, SignUpCard } from "./pages";
import { Nav } from "./components";
import { useEffect, useState } from "react";
import { checkAuthentication } from "./hooks";

const ProtectedRoute = ({
  isAuthen,
  redirectPath = "/",
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
  const queryClient = new QueryClient();
  const [isAuthen, setIsAuthen] = useState(false);

  useEffect(() => {
    checkAuthentication(setIsAuthen);
  }, []);

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Nav isAuthen={isAuthen} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUpCard />} />
            <Route
              path="/login"
              element={<SignInCard setIsAuthen={setIsAuthen} />}
            />
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
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

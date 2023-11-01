import { createContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  About,
  Friends,
  Home,
  MainFeed,
  ProfilePage,
  SignInCard,
  SignUpCard,
} from "./pages";
import { Nav } from "./components";
import { checkAuthentication } from "./hooks";

export const UserContext = createContext({
  user: {
    isAuthen: false,
    profileMode: {
      mode: "myProfile",
      userId: null,
    },
  },
  setUser: (_newUser: {
    isAuthen: boolean;
    profileMode: { mode: string; userId: any };
  }) => {}, 
});

function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const userInfoString = localStorage.getItem("userInfo");
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    return {
      isAuthen: !!token,
      profileMode: {
        mode: "myProfile",
        userId: userInfo?.userId || null,
      },
    };
  });

  const queryClient = new QueryClient();

  useEffect(() => {
    // console.log("user auth", user?.isAuthen);

    checkAuthentication({ setUser });
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ user, setUser }}>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUpCard />} />
            <Route path="/login" element={<SignInCard />} />
            <Route path="/about" element={<About />} />
            <Route element={<ProtectedRoute user={user} redirectPath="/" />}>
              <Route path="/main" element={<MainFeed />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/friends" element={<Friends />} />
            </Route>
            <Route path="*" element={<>404: Page not found</>} />
          </Routes>
        </UserContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

const ProtectedRoute = ({
  user,
  redirectPath,
}: {
  user: { isAuthen: boolean; profileMode: { mode: string; userId: number } };
  redirectPath: string;
}) => {
  const navigate = useNavigate();

  if (!user.isAuthen) {
    navigate(redirectPath, { replace: true });
    return null;
  }

  return <Outlet />;
};

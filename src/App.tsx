import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Home, MainFeed, ProfilePage, SignInCard, SignUpCard } from "./pages";
import { Nav } from "./components";
import { Dispatch, createContext, useState } from "react";
import ProtectedRoute from "./hooks/useProtectedRoute";
import React from "react";

export const AuthContext = createContext({
  isAuthen: false,
  setIsAuthen: (() => {}) as Dispatch<React.SetStateAction<boolean>>,
});

function App() {
  const queryClient = new QueryClient();
  const [isAuthen, setIsAuthen] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ isAuthen, setIsAuthen }}>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUpCard />} />
            <Route path="/login" element={<SignInCard />} />
            <Route element={<ProtectedRoute />}>
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

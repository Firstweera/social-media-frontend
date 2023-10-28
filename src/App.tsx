import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, MainFeed, SignInCard, SignUpCard } from "./pages";
import { Nav } from "./components";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const currentPath = window.location.pathname.split("/")[1];
    console.log("currentPath:", currentPath, typeof currentPath);
    setIsAuthenticated(
      currentPath !== undefined &&
        currentPath !== "" &&
        currentPath !== "login" &&
        currentPath !== "register"
    );

    console.log("isAuthenticated", isAuthenticated);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Nav isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SignUpCard />} />
          <Route path="/login" element={<SignInCard />} />
          <Route path="/Main" element={<MainFeed />} />
          <Route path="*" element={<>404 Not found</>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

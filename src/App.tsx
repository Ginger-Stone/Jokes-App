import React, { useContext, useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Edit from "./pages/Jokes/Edit";
import Create from "./pages/Jokes/Create";
import { AuthContext } from "./context/authContext";
import Login from "./pages/Auth/Login";
import { useTheme } from "./context/themeContext";
import "./styles/global.scss";
const App = () => {
  const authContext = useContext(AuthContext);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(authContext?.token);
    if (authContext?.token.token == undefined) {
      console.log("Back to login");
      navigate("/login");
    } else {
      console.log("Home");
      navigate("/");
    }
  }, [authContext?.token.token]);

  return (
    <div className={"app"} style={{ ...theme } as React.CSSProperties}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jokes">
          <Route index element={<Home />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="create" element={<Create />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;

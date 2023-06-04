import React from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Edit from "./pages/Jokes/Edit";
import Create from "./pages/Jokes/Create";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jokes">
        <Route index element={<Home />} />
        <Route path="edit/:id" element={<Edit />} />
        <Route path="create" element={<Create />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

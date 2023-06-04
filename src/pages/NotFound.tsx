import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <h1>
      Ooops! The page you're looking for is not found.
      <Link to={"/"}> Go Back Home </Link>
    </h1>
  );
};

export default NotFound;

import React from "react";
import { Info } from "../../types/interfaces";

const Status = ({ success, message }: Info) => {
  if (message) {
    return <h2>{message}</h2>;
  } else {
    return <></>;
  }
};

export default Status;

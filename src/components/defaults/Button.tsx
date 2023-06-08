import React from "react";
import styles from "../../styles/components/defaults/button.module.scss";
import { Button } from "../../types/interfaces";

const Button = ({ label, handleClick, disabled, cta = true }: Button) => {
  return (
    <button
      disabled={disabled}
      className={`${cta ? styles.cta : styles.no_cta}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;

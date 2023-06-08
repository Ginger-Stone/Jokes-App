import React, { useContext } from "react";
import { Button } from "../../components";
import { AuthContext } from "../../context/authContext";
import styles from "../../styles/auth/login.module.scss";

const Login = () => {
  const authContext = useContext(AuthContext);
  return (
    <div className={styles.login}>
      <h1>Log in</h1>
      <p>Click button to Login to Jokes App</p>
      <Button label="Login" handleClick={authContext?.updateToken} />
    </div>
  );
};

export default Login;

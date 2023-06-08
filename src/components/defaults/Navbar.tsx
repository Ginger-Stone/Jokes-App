import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Button from "./Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteJoke } from "../../api/jokeAPI";
import Status from "./Status";
import {
  DropdownDataType,
  Info,
  initialInfoState,
} from "../../types/interfaces";
import Dropdown from "./Dropdown";
import { CurrentPageLimitContext } from "../../context/currentPageLimitContext";
import Darkmode from "./Darkmode";
import { AuthContext } from "../../context/authContext";
import styles from "../../styles/components/defaults/navbar.module.scss";

const Navbar = () => {
  const { currentPageLimit, UpdatePageLimit } = useContext(
    CurrentPageLimitContext
  );
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [info, setInfo] = useState<Info>(initialInfoState);
  const PageLimitDropdownData: DropdownDataType = [5, 10];

  const backHome = () => {
    navigate("/");
  };
  const removeJoke = async () => {
    if (id && !info.success) {
      const res = await deleteJoke(id);
      setInfo(res);
    } else {
      setInfo({
        ...info,
        message: "Already deleted. Click Close to go back home.",
      });
    }
  };

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    UpdatePageLimit?.({
      page: currentPageLimit.page,
      limit: value === 5 || value === 10 ? value : currentPageLimit.limit,
    });
  };

  return (
    <nav className={styles.nav}>
      <Status success={info.success} message={info.message} />
      {/* For Home page */}
      {pathname == "/" && (
        <>
          <Dropdown
            currentSelection={currentPageLimit.limit}
            availableOptions={PageLimitDropdownData}
            handleSelectionChange={handleLimitChange}
          />
          <div className={styles.actions}>
            <Button
              label="Add New Joke"
              handleClick={() => {
                navigate("/jokes/create");
              }}
            />
            <Button
              label="Logout"
              cta={false}
              handleClick={authContext.removeToken}
            />
          </div>
        </>
      )}
      {/* For create and Edit pages */}
      <div
        className={`${styles.actions} ${
          pathname != "/" && !id && styles.centered
        }`}
      >
        {pathname != "/" && (
          <Button label="Close" handleClick={backHome} cta={false} />
        )}
        {id && <Button label="Delete" handleClick={removeJoke} cta={false} />}
      </div>
      {pathname != "/" && <div></div>}
      {/* For All */}
      <Darkmode />
    </nav>
  );
};

export default Navbar;

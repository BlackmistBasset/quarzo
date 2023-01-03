import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserProvider } from "../components/UserProvider";
import { Wrapper } from "../components/Wrapper";

import { Center, Spinner } from "@chakra-ui/react";

export const Inventario = () => {
  const [userInfo, setUserInfo] = useState({});
  const [state, setState] = useState(0);

  const navigate = useNavigate();

  const handleUserLoggedIn = async (user) => {
    setUserInfo(user);
    setState(2);
  };

  const handleUserNotLoggedIn = () => navigate("/login");
  if (state === 2) {
    return (
      <>
        <Wrapper userInfo={userInfo} />
        INVENTARIO
      </>
    );
  } else {
    return (
      <UserProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
      >
        <Wrapper userInfo={userInfo}>
          <Center width="100%" height="70vh">
            <Spinner />
          </Center>
        </Wrapper>
      </UserProvider>
    );
  }
};

import React, { useEffect } from "react";

import { auth, getUserInfo } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const UserProvider = ({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
}) => {
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userInfo = await getUserInfo(user.uid);
        onUserLoggedIn(userInfo);
      } else {
        onUserNotLoggedIn();
      }
    });
  }, [onUserLoggedIn, onUserNotLoggedIn]);

  return <div>{children}</div>;
};

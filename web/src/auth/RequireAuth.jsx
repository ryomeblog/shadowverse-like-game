import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Auth } from "aws-amplify";

function RequireAuth() {

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser();
    } catch (error) {
      Auth.federatedSignIn();
    }
  };

  return <Outlet />;
}

export default RequireAuth;

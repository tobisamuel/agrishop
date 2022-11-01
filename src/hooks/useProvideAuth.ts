import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import getIdFromToken from "../utils/decodeToken";
import { loginUser, logoutUser, refreshToken } from "../api/requests";

interface LocationState {
  from: {
    pathname: string;
  };
}

function useProvideAuth() {
  const [accessToken, setAccessToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = (location.state as LocationState)?.from.pathname;

  const signInMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      const userId = getIdFromToken(data.accessToken);
      setUserId(userId);
      navigate(pathname || "/", { replace: true });
    },
  });

  const isLoggedIn = accessToken ? true : false;

  const refresh = async () => {
    const { accessToken } = await refreshToken();
    setAccessToken((prev) => accessToken);

    return accessToken;
  };

  const signOut = async () => {
    await logoutUser();
    setAccessToken("");
  };

  return {
    accessToken,
    isLoggedIn,
    refresh,
    signInMutation,
    signOut,
    userId,
  };
}

export default useProvideAuth;

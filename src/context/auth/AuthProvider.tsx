import { useMutation } from "@tanstack/react-query";
import { FC, PropsWithChildren, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser, logoutUser, refreshToken } from "../../api/requests";
import getIdFromToken from "../../utils/decodeToken";
import { AuthContext } from "./AuthContext";

interface LocationState {
  from: {
    pathname: string;
  };
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = (location.state as LocationState)?.from.pathname;

  const signInMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      const id = getIdFromToken(data.accessToken);
      setUserId(id);
      navigate(pathname || "/", { replace: true });
    },
  });

  const isLoggedIn = accessToken ? true : false;

  const refresh = async () => {
    const { accessToken } = await refreshToken();
    setAccessToken(accessToken);
    return accessToken;
  };

  const signOut = async () => {
    await logoutUser();
    setAccessToken("");
    setUserId("");
  };

  const auth = {
    accessToken,
    isLoggedIn,
    refresh,
    signInMutation,
    signOut,
    userId,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

import { FC, PropsWithChildren, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser, logoutUser, refreshToken } from "../../api/requests";
import { UserFormInputs } from "../../components/SigninForm";
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

  const loginFunc = async (data: UserFormInputs) => {
    const response = await loginUser(data);
    setAccessToken(response.accessToken);
    const id = getIdFromToken(response.accessToken);
    setUserId(id);
    navigate(pathname || "/", { replace: true });
  };

  const refresh = async () => {
    const { accessToken } = await refreshToken();
    setAccessToken(accessToken);
    const id = getIdFromToken(accessToken);
    setUserId(id);
    return accessToken;
  };

  const signOut = async () => {
    await logoutUser();
    setAccessToken("");
    setUserId("");
  };

  const auth = {
    accessToken,
    loginFunc,
    refresh,
    signOut,
    userId,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

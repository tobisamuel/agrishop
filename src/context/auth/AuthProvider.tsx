import { FC, PropsWithChildren } from "react";
import useProvideAuth from "../../hooks/useProvideAuth";
import { AuthContext } from "./AuthContext";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

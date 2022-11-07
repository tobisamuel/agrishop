import { createContext } from "react";
import { UserFormInputs } from "../../components/SigninForm";
import { User } from "../../utils/types";

export type AuthContextType = {
  accessToken: string;
  loginFunc: (data: UserFormInputs) => Promise<void>;
  refresh: () => Promise<string>;
  signOut: () => Promise<void>;
  userId: string;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

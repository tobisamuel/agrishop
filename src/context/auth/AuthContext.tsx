import { createContext } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { UserFormInputs } from "../../components/SigninForm";
import { LoginResponse } from "../../utils/types";

export type AuthContextType = {
  accessToken: string;
  isLoggedIn: boolean;
  refresh: () => Promise<string>;
  signInMutation: UseMutationResult<
    LoginResponse,
    unknown,
    UserFormInputs,
    unknown
  >;
  signOut: () => Promise<void>;
  userId: string;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

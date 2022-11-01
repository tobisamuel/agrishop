import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "./spinner";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAuth();
  const { refresh } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return <>{isLoading ? <Spinner /> : <Outlet />}</>;
};

export default PersistLogin;

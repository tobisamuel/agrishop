import jwt_decode, { JwtPayload } from "jwt-decode";

type AuthPayload = JwtPayload & { id: string; email: string };

const getIdFromToken = (token: string) => {
  const decoded = jwt_decode<AuthPayload>(token);
  const userId = decoded.id;

  return userId;
};

export default getIdFromToken;

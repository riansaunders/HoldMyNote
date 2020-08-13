import { createContext } from "react";

interface UserContextProps {
  user?: firebase.User;
  signedIn: boolean;
}

export const UserContext = createContext<UserContextProps>({
  user: undefined,
  signedIn: false,
});

export default UserContext;

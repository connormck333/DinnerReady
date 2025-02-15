import { createContext } from "react";
import { User, UserContextType } from "../utils/interfaces";

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
import { createContext } from "react";
import { RefreshContextType } from "../utils/interfaces";

const UserRefreshContext = createContext<RefreshContextType | undefined>(undefined);

export default UserRefreshContext;
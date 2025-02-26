import { createContext } from "react";
import { RefreshContextType } from "../utils/interfaces";

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

export default RefreshContext;
import { createContext } from "react";
import type { ModalContextType } from "./types";

export const ModalContext = createContext<ModalContextType | null>(null);

import { createContext } from "react";

const defaultUser = {
  name: '',
  avatar: '',
  about: '',
}

export const CurrentUserContext = createContext(defaultUser);
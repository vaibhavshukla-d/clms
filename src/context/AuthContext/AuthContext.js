import { createContext } from "react";

const AuthContext = createContext({
  auth: false, // Set a default value for auth
  setAuth: () => {}, // Set a default function for setAuth
});

export default AuthContext;

import AuthContext from "@/context/AuthContext/AuthContext.js";
import { useState } from "react";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

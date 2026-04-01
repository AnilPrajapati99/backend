import { createContext, useState, useEffect } from "react";

export const authContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loding, setLoding] = useState(false);

 
  return (
    <authContext.Provider value={{ user, setLoding,setUser, loding }}>
      {children}
    </authContext.Provider>
  );
}

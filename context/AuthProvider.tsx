"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  userId:number;
  setToken: (token: string | null) => void;
  login: (newToken: string,id:number) => void;
  logout: () => void;
  setUid:(id:number)=>void
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [uid, setUid] = useState<number | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setTokenState(newToken);
  };

  const login = (newToken: string,id:number) => {
    setToken(newToken);
    setUid(id)
  };
  
  const logout = () => {
    setToken(null);
    setUid(null)
  };

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout,userId:uid }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
};

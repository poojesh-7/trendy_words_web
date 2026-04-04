"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  userId: number | null;
  setToken: (token: string | null) => void;
  login: (newToken: string, id: number, role: string) => void;
  logout: () => void;
  setUid: (id: number | null) => void;
  role: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [uid, setUidState] = useState<number | null>(null);
  const [role, setRoleState] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUid = localStorage.getItem("uid");
    if (storedToken) {
      setTokenState(storedToken);
    }
    if (storedRole) {
      setRoleState(storedRole);
    }
    if (storedUid) {
      setUidState(parseInt(storedUid));
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

  const setRole = (role: string | null) => {
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
    setRoleState(role);
  };

  const setUid = (id: number | null) => {
    if (id !== null) {
      localStorage.setItem("uid", id.toString());
    } else {
      localStorage.removeItem("uid");
    }
    setUidState(id);
  };



  const login = (newToken: string,id:number,role:string) => {
    setToken(newToken);
    setUidState(id)
    setRole(role)
  };
  
  const logout = () => {
    setToken(null);
    setUidState(null)
    setRole(null)
  };

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout, userId: uid, role, setUid }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
};

import { useState, useEffect } from "react";
import { storage } from "../utils/storage";

export function useAuth() {
    const [user, setUser] = useState(storage.getUser());
    const [isAuthenticated, setIsAuthenticated] = useState(!!storage.getToken());
  
    useEffect(() => {
      const token = storage.getToken();
      const currentUser = storage.getUser();
      
      setIsAuthenticated(!!token);
      setUser(currentUser);
    }, []);
  
    const login = (userData, token) => {
      storage.setToken(token);
      storage.setUser(userData);
      setUser(userData);
      setIsAuthenticated(true);
    };
  
    const logout = () => {
      storage.removeToken();
      storage.removeUser();
      setUser(null);
      setIsAuthenticated(false);
    };
  
    return {
      user,
      isAuthenticated,
      login,
      logout
    };
  }
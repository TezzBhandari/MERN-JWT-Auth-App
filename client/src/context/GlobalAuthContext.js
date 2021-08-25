import React, { useState, useEffect, useContext } from 'react';
import { isAuthenticated } from '../services/AuthService';

const AuthContext = React.createContext();

function GlobalAuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = isAuthenticated();
    setUser(data.user);
    setAuthenticated(data.isAuthenticated);
    setIsLoading(true);
  }, []);

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, authenticated, setAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
}

export const useGlobalContext = () => {
  return useContext(AuthContext);
};

export default GlobalAuthContext;

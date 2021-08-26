import React, { useState, useEffect, useContext } from 'react';
import { isAuthenticated } from '../services/AuthService';

const AuthContext = React.createContext();

function GlobalAuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    isAuthenticated()
      .then((data) => {
        setUser(data.user);
        setAuthenticated(data.isAuthenticated);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='loading-container'>
          <div className='loading'></div>
        </div>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, authenticated, setAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
}

export const useGlobalContext = () => {
  return useContext(AuthContext);
};

export default GlobalAuthContext;

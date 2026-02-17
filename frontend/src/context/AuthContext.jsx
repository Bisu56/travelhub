import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Here you would typically check for a token in localStorage
    // and validate it, or fetch user data if a session exists.
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you'd verify the token with your backend
      // For now, we'll just set a dummy user
      setUser({ username: 'testuser' });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          if (email === 'user@example.com' && password === 'password') {
            const dummyToken = 'dummy-jwt-token';
            localStorage.setItem('token', dummyToken);
            setUser({ username: 'user@example.com' });
            resolve({ success: true });
          } else {
            resolve({ success: false, message: 'Invalid credentials' });
          }
          setLoading(false);
        }, 1000);
      });
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return { success: false, message: 'An error occurred' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (username, email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          // In a real app, you'd send this to your backend
          console.log('Registering user:', { username, email, password });
          resolve({ success: true });
          setLoading(false);
        }, 1500);
      });
    } catch (error) {
      console.error('Registration error:', error);
      setLoading(false);
      return { success: false, message: 'An error occurred' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

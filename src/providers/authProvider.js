import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const AuthContext = React.createContext({
  doLogin: () => {},
  doLogout: () => {},
  token: undefined,
});

const AuthProvider = (props) => {
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    }
  }, [token]);

  const doLogin = async (user) => {
    try {
      const resp = await axios.post('login', { user });
      console.log('resp', resp);
      localStorage.setItem('token', resp.data.token);
      setToken(resp.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const doLogout = () => {
    localStorage.removeItem('token');
  };

  const getContextValue = () => {
    return {
      doLogin,
      doLogout,
      token,
    };
  };
  return <AuthContext.Provider value={getContextValue()}>{token ? props.children[1] : props.children[0]}</AuthContext.Provider>;
};

export default AuthProvider;

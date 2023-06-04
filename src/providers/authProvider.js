import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useFetchRecords from '../hooks/useFetchRecords.js';

export const AuthContext = React.createContext({
  doLogin: () => {},
  doLogout: () => {},
  token: undefined,
});

const AuthProvider = (props) => {
  const [token, setToken] = useState();
  const { fetchData } = useFetchRecords(true);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    }
  }, [token]);

  const doLogin = async (user) => {
    try {
      const resp = await axios.post('login', { user });
      console.log('respFromAuthprovider', resp);
      localStorage.setItem('token', resp.data.token);
      setToken(resp.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const doLogout = () => {
    localStorage.removeItem('token');
    fetchData();
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

import { useState } from 'react';
import axios from 'axios';
import useFetchRecords from './useFetchRecords.js';

const useAddRecords = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const { fetchData } = useFetchRecords(true);

  const addRecord = async (newUser) => {
    setLoading(true);

    try {
      const data = await axios.post('records/', newUser);
      console.log('data from useAddRecords', data);
      setData(data);
      fetchData();
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return { addRecord, data, loading, error };
};

export default useAddRecords;

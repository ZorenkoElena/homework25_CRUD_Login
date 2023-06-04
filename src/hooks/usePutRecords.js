import { useState } from 'react';
import axios from 'axios';
import useFetchRecords from './useFetchRecords.js';

const usePutRecords = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const { fetchData } = useFetchRecords(true);

  const putRecord = async (user, id) => {
    setLoading(true);
    try {
      const data = await axios.put(`records/${id}`, user);
      console.log('data from usePutRecords', data);
      setData(data);
      fetchData();
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return { putRecord, data, loading, error };
};

export default usePutRecords;

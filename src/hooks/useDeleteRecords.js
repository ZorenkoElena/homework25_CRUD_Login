import { useState } from 'react';
import axios from 'axios';
import useFetchRecords from './useFetchRecords.js';

const useDeleteRecords = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const { fetchData } = useFetchRecords(true);

  const delRecord = async (id) => {
    setLoading(true);
    try {
      const data = await axios.delete(`records/${id}`);
      setData(data);
      fetchData();
      console.log('data from useDeleteRecords', data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return { delRecord, data, loading, error };
};

export default useDeleteRecords;

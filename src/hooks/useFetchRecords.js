import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { RecordsDataContext } from '../providers/recordsDataProviders.js';

const useFetchRecords = (isManual = false) => {
  const recordsCtx = useContext(RecordsDataContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (!isManual) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const resp = await axios.get('records/');
      console.log('resp from useFetchRecords', resp);
      recordsCtx.setRecords(resp);
      setLoading(false);
    } catch (error) {
      // setError(error);
      console.log('Ошибка из UseFetch...', error);
    }
  };

  return { data: recordsCtx.records, loading, error, fetchData };
};

export default useFetchRecords;

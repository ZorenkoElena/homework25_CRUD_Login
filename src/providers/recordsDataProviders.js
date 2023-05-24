import React, { useState } from 'react';

export const RecordsDataContext = React.createContext({
  setRecords: () => {},
  records: [],
});

const RecordsDataContextProvider = (props) => {
  const [records, setRecords] = useState([]);

  const getContextValue = () => {
    return {
      setRecords: (data) => setRecords(data),
      records,
    };
  };
  return <RecordsDataContext.Provider value={getContextValue()}>{props.children}</RecordsDataContext.Provider>;
};

export default RecordsDataContextProvider;

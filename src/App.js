import { useState, useContext } from 'react';
import './App.css';

import useFetchRecords from './hooks/useFetchRecords';

import AddRecordForm from './components/addRecordForm';
import ChangeForm from './components/changeForm';
import PhoneCard from './components/phoneCard';
import RecordsDataContextProvider from './providers/recordsDataProviders.js';
import AuthProvider, { AuthContext } from './providers/authProvider.js';

const RecordList = (props) => {
  const [editFormIndex, setEditFormIndex] = useState(null);

  return (
    <div>
      {props.recordList?.data &&
        props.recordList.data.map((record, index) => {
          return (
            <div key={`phone-card-${index}`} className="phone-card">
              {index === editFormIndex ? (
                <ChangeForm index={index} record={record} isForm={(data) => setEditFormIndex(data)} />
              ) : (
                <PhoneCard index={index} record={record} isForm={(data) => setEditFormIndex(data)} />
              )}

              {/* <hr /> */}
            </div>
          );
        })}
    </div>
  );
};

const PhoneBookRecords = () => {
  const { data, loading, error } = useFetchRecords();

  if (error) {
    console.log('Ошибка из app.js', error);
    return <h1 style={{ color: 'red' }}>We have a problem</h1>;
  }

  console.log('data from useFetchRecords:', data);

  return <>{loading ? <p>loading...</p> : <RecordList recordList={data} />}</>;
};

const LoginForm = () => {
  const authCtx = useContext(AuthContext);
  const [value, setValue] = useState('');

  const doLogin = (event) => {
    event.preventDefault();
    authCtx.doLogin(value);
  };
  const onType = (event) => {
    setValue(event.target.value);
    // console.log('event', event);
  };
  return (
    <form onSubmit={doLogin}>
      <input type="text" placeholder="username" value={value} onChange={onType}></input>
      <button type="submit">Login</button>
    </form>
  );
};

const LogoutForm = () => {
  const authCtx = useContext(AuthContext);

  const doLogout = (event) => {
    event.preventDefault();
    authCtx.doLogout();
  };

  return (
    <form onSubmit={doLogout}>
      <button type="submit">Logout</button>
    </form>
  );
};

function App() {
  return (
    <AuthProvider>
      <LoginForm />
      <RecordsDataContextProvider>
        <LogoutForm />
        <div className="container">
          <div className="App">
            <h4>Phone Book</h4>
            <div className="row">
              <div className="col-4 col-md-3">Имя</div>
              <div className="col-4 col-md-3">Фамилия</div>
              <div className="col-4 col-md-3">Телефон</div>
            </div>
            <hr />
            <AddRecordForm />
            <hr />
            <PhoneBookRecords />
          </div>
        </div>
      </RecordsDataContextProvider>
    </AuthProvider>
  );
}

export default App;

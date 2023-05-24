import { useState, useEffect } from 'react';
import useAddRecords from '../hooks/useAddRecords';

const AddRecordForm = () => {
  const { addRecord, data, loading, error } = useAddRecords();

  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isValidForm, setIsValidForm] = useState(false);

  useEffect(() => {
    if (!name || !surName || !phone || phoneError) {
      setIsValidForm(false);
    } else {
      setIsValidForm(true);
    }
  }, [name, surName, phone, phoneError]);

  const addRecordHandler = () => {
    addRecord({
      name,
      surname: surName,
      phone,
    });
  };

  const nameHandler = (event) => {
    setName(event.target.value);
    console.log('name', name);
  };
  const surNameHandler = (event) => {
    setSurName(event.target.value);
  };

  const phoneHandler = (event) => {
    setPhone(event.target.value);
    const re = /^\+380[0-9]{9}$/;
    if (!re.test(String(event.target.value))) {
      setPhoneError('Введите номер в формате +380*********');
    } else {
      setPhoneError('');
    }
  };

  return (
    <div>
      <form className="row">
        <div className="col-4 col-md-3">
          <input onChange={(event) => nameHandler(event)} value={name} name="name" type="text" placeholder="name" />
        </div>
        <div className="col-4 col-md-3">
          <input onChange={(event) => surNameHandler(event)} value={surName} name="surname" type="text" placeholder="surname" />
        </div>
        <div className="col-4 col-md-3">
          {phoneError && <div>{phoneError}</div>}
          <input onChange={(event) => phoneHandler(event)} value={phone} name="phone" type="text" placeholder="phone +380***" />
        </div>
        <div className="col">
          <button disabled={!isValidForm} onClick={addRecordHandler} className="btn btn-outline-dark py-1">
            Add record
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddRecordForm;

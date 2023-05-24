import { useState, useEffect } from 'react';
import usePutRecords from '../hooks/usePutRecords';

const ChangeForm = (props) => {
  const { putRecord } = usePutRecords();

  const [name, setName] = useState(props.record.name);
  const [surName, setSurName] = useState(props.record.surname);
  const [phone, setPhone] = useState(props.record.phone);
  const [phoneError, setPhoneError] = useState('');
  const [isValidForm, setIsValidForm] = useState(false);

  useEffect(() => {
    if (!name || !surName || !phone || phoneError) {
      setIsValidForm(false);
    } else {
      setIsValidForm(true);
    }
  }, [name, surName, phone, phoneError]);

  const putRecordHandler = () => {
    putRecord(
      {
        name,
        surname: surName,
        phone,
      },
      props.index
    );
    props.isForm(null);
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
    <div className="form">
      <form className="row">
        <div className="col-4 col-md-3">
          <input onChange={(event) => nameHandler(event)} value={name} name="name" type="text" placeholder={name} />
        </div>
        <div className="col-4 col-md-3">
          <input onChange={(event) => surNameHandler(event)} value={surName} name="surname" type="text" placeholder="surname" />
        </div>
        <div className="col-4 col-md-3">
          {phoneError && <div>{phoneError}</div>}
          <input onChange={(event) => phoneHandler(event)} value={phone} name="phone" type="text" placeholder="phone +380***" />
        </div>
        <div className="col">
          <button disabled={!isValidForm} onClick={putRecordHandler} className="btn btn-outline-dark py-1">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default ChangeForm;

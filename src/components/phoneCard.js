import useDeleteRecords from '../hooks/useDeleteRecords';

const PhoneCard = (props) => {
  const { delRecord, data, loading, error } = useDeleteRecords();
  const deleteHandler = (index) => {
    delRecord(index);
  };
  return (
    <div className="row">
      <div className="col-4 col-md-3">{props.record.name}</div>
      <div className="col-4 col-md-3">{props.record.surname}</div>
      <div className="col-4 col-md-3">{props.record.phone}</div>
      <div className="col">
        <button
          onClick={() => {
            console.log('props.index', props.index);
            props.isForm(props.index);
          }}
          className="btn btn-outline-dark"
        >
          Change
        </button>
      </div>
      <div className="col">
        <button onClick={() => deleteHandler(props.index)} className="btn btn-outline-dark">
          Delete
        </button>
      </div>
    </div>
  );
};
export default PhoneCard;

import { GripVertical, Trash } from 'react-bootstrap-icons';

const Criterion = ({ index, criterion, onChange, onRemove }) => {
  const handleChange = (prop, value) => onChange(index, { ...criterion, [prop]: value });

  return <div className='d-flex gap-2 py-1 align-items-center bg-white'>
    <GripVertical size='25' />

    <div className='flex-grow-1 form-floating'>
      <input
        className='form-control'
        type='text'
        value={criterion.name}
        onChange={e => handleChange('name', e.target.value)} />
      <label>Назва критерію</label>
    </div>

    <div className='flex-grow-1 form-floating'>
      <input
        className='form-control'
        type='number'
        value={criterion.limit}
        onChange={e => handleChange('limit', e.target.valueAsNumber)} />
      <label>Кількість балів</label>
    </div>

    <button className='btn btn-outline-secondary align-self-stretch' onClick={() => onRemove(index)}>
      <Trash />
    </button>
  </div>;
};

export default Criterion;

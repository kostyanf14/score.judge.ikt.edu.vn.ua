import { useState, useContext } from 'react';
import { GripVertical, Trash } from 'react-bootstrap-icons';

import ApiContext from '../api/context';

const CriterionForm = ({ criterion }) => {
  const apiPerform = useContext(ApiContext);
  const [name, setName] = useState(criterion.name);
  const [limit, setLimit] = useState(criterion.limit);
  const { id } = criterion;

  const performUpdate = () => apiPerform('update_criterion', { id, params: { name, limit } });
  const performDelete = () => apiPerform('delete_criterion', { id });

  return <div className='d-flex gap-2 py-1 align-items-center bg-white'>
    <GripVertical size='25' />

    <div className='flex-grow-1 form-floating'>
      <input
        className='form-control'
        type='text'
        value={name}
        onChange={e => setName(e.target.value)}
        onBlur={performUpdate} />
      <label>Назва критерію</label>
    </div>

    <div className='flex-grow-1 form-floating'>
      <input
        className='form-control'
        type='number'
        value={limit}
        onChange={e => setLimit(e.target.valueAsNumber)}
        onBlur={performUpdate} />
      <label>Кількість балів</label>
    </div>

    <button className='btn btn-outline-secondary align-self-stretch' onClick={performDelete}>
      <Trash />
    </button>
  </div>;
};

export default CriterionForm;

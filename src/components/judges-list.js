import { useSelector, shallowEqual } from 'react-redux';
import { Trash } from 'react-bootstrap-icons';

import api from '../api/action-cable';

const performDelete = (value, index) => {
  window.confirm(`Are you sure you want to delete judge "${value}"?`) && api.perform('delete_judge', { value, index });
};

const JudgesList = () => {
  const readOnly = useSelector(s => s.app.readOnly);
  const judges = useSelector(s => s.judges, shallowEqual);

  return (
    <ul className='list-group'>
      {judges.map((judge, index) => (
        <li className='list-group-item d-flex justify-content-between align-items-center' key={judge}>
          <span>{judge}</span>
          <button className='btn btn-outline-danger align-self-stretch' disabled={readOnly}
            onClick={() => performDelete(judge, index)}>
            <Trash />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default JudgesList;

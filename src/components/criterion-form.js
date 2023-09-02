import { useCallback, useEffect } from 'react';
import { GripVertical, Trash } from 'react-bootstrap-icons';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import api from '../api/action-cable';
import criteriaSlice from '../state/criteria';

const CriterionForm = ({ id }) => {
  const readOnly = useSelector(s => s.app.readOnly);
  const { name, limit, dirty } = useSelector(s => s.criteria.find(c => c.id === id), shallowEqual);
  const deleteDisabled = useSelector(s => Object.values(s.results).some(r => r[id])) || readOnly
  const dispatch = useDispatch();

  const performDelete = useCallback(
    () => window.confirm(`Are you sure you want to delete criterion "${name}"?`) && api.perform('delete_criterion', { id }),
    [name, id]
  );
  const onNameChange = useCallback(
    e => dispatch(criteriaSlice.actions.dirtyUpdate({ id, name: e.target.value })),
    [id, dispatch]
  );
  const onLimitChange = useCallback(
    e => dispatch(criteriaSlice.actions.dirtyUpdate({ id, limit: e.target.value })),
    [id, dispatch]
  );

  useEffect(
    () => dirty && api.perform('update_criterion', { id, token: dirty, params: { name, limit } }),
    [id, name, limit, dirty]
  );

  return <div className='d-flex gap-2 py-1 align-items-center bg-white'>
    <GripVertical size='25' />

    <div className='flex-grow-1 form-floating'>
      <input className='form-control' type='text' disabled={readOnly} value={name} min={0} onChange={onNameChange} />
      <label>Назва критерію</label>
    </div>

    <div className='flex-grow-1 form-floating'>
      <input className='form-control' type='number' disabled={readOnly} value={limit} min={0} onChange={onLimitChange} />
      <label>Кількість балів</label>
    </div>

    <button className='btn btn-outline-danger align-self-stretch' disabled={deleteDisabled} onClick={performDelete}>
      <Trash />
    </button>
  </div>;
};

export default CriterionForm;

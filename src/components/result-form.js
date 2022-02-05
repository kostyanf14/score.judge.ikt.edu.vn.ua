import { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import api, { clientId } from '../api/action-cable';
import resultsSlice from '../state/results';

const ResultForm = ({ user, criterion, max }) => {
  const key = `${user}:${criterion}`;
  const result = useSelector(s => s.results[key], shallowEqual);
  const lockedId = useSelector(s => s.locks[key]);
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(false);

  const { value, dirty } = result || { value: '' };
  const lockAcquired = lockedId === clientId;
  const status = focused ? (lockAcquired ? (dirty ? 'warning' : 'success') : 'danger') : (dirty ? 'danger' : 'success');
  const inputClassName = classNames('form-control', 'border', {
    'border-danger': status === 'danger',
    'text-danger': status === 'danger',
    'border-warning': status === 'warning',
    'border-success': status === 'success',
  });

  const onFocus = useCallback(
    () => { setFocused(true); api.perform('acquire_lock', { user, criterion }); },
    [user, criterion, setFocused]
  );

  const onBlur = useCallback(
    () => { setFocused(false); api.perform('release_lock', { user, criterion }); },
    [user, criterion, setFocused]
  );

  const onChange = useCallback(
    e => {
      if (!focused || lockAcquired)
        dispatch(resultsSlice.actions.dirtyUpdate({ user, criterion, value: e.target.valueAsNumber }))
    },
    [user, criterion, dispatch, focused, lockAcquired]
  );

  useEffect(
    () => dirty && api.perform('write_result', { user, criterion, value, token: dirty }),
    [user, criterion, value, dirty]
  );

  useEffect(
    () => {
      if (dirty && !lockAcquired) {
        const timeout = setTimeout(() => api.perform('reset_result', { user, criterion }), 10000);
        return () => clearTimeout(timeout);
      }
    },
    [user, criterion, dirty, lockAcquired]
  );

  return (
    <div className='position-relative'>
      <div className='input-group'>
        <input
          className={inputClassName}
          type='number'
          style={{ width: 80 }}
          min={0}
          max={max}
          value={value}
          disabled={lockedId && !lockAcquired}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur} />
      </div>

      {focused && <div className={`status-notice status-notice__${status}`}>
        {status === 'danger' && 'Acquiring lock ...'}
        {status === 'warning' && 'Saving ...'}
        {status === 'success' && 'Ready'}
      </div>}
    </div>
  );
};

export default ResultForm;

import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import api from '../api/action-cable';

const ResultMultiplierAccordionItem = () => {
  const readOnly = useSelector(s => s.app.readOnly);
  const value = useSelector(s => s.resultMultiplier);

  const onChange = useCallback(e => api.perform('write_result_multiplier', { value: e.target.value }), []);

  return (
    <div className='accordion-item'>
      <h2 className='accordion-header'>
        <button className='accordion-button collapsed' type='button'
          data-bs-toggle='collapse' data-bs-target='#result-multiplier'
          aria-expanded='false' aria-controls='result-multiplier'>
          Множник до результату
        </button>
      </h2>

      <div id='result-multiplier' className='accordion-collapse collapse' data-bs-parent='#page-accordion'>
        <div className='accordion-body'>
          <div className='form-floating'>
            <input className='form-control' type='text' disabled={readOnly} value={value} onChange={onChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultMultiplierAccordionItem;

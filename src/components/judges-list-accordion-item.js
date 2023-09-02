import { createPortal } from 'react-dom';

import JudgesList from './judges-list';
import NewJudgeModal from './new-judge-modal';

const JudgesListAccordionItem = () => (
  <div className='accordion-item'>
    <h2 className='accordion-header'>
      <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#judges-list'
        aria-expanded='false' aria-controls='judges-list'>
        Члени журі
      </button>
    </h2>

    <div id='judges-list' className='accordion-collapse collapse' data-bs-parent='#page-accordion'>
      <div className='accordion-body'>
        <JudgesList />
        <NewJudgeModal.Button />
        {createPortal(<NewJudgeModal />, document.body)}
      </div>
    </div>
  </div>
);

export default JudgesListAccordionItem;

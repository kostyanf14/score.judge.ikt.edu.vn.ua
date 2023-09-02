import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ArrowRightSquareFill } from 'react-bootstrap-icons';

import ResultsTablePreview from '../components/results-table-preview';
import CriteriaListAccordionItem from '../components/criteria-list-accordion-item';
import JudgesListAccordionItem from '../components/judges-list-accordion-item';

const CriteriaEditPage = ({ next }) => {
  const nextDisabled = useSelector(s => s.criteria.some(c => c.dirty));
  const contestName = useSelector(s => s.app.contest_name);
  const taskName = useSelector(s => s.app.task_name);

  const handleNext = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    next();
  }, [next]);

  return (
    <div className='p-2'>
      <h1 className='mb-2'>Налаштування</h1>
      <hr />

      <div className='alert alert-info' role='alert'>
        <p className='mb-0'><strong>Змагання:</strong> {contestName}</p>
        <p className='mb-0'><strong>Задача:</strong> {taskName}</p>
      </div>

      <div id='page-accordion' className='accordion accordion-flush'>
        <CriteriaListAccordionItem />
        <JudgesListAccordionItem />
      </div>

      <button className='btn btn-primary mt-1  d-block w-100 text-center' onClick={handleNext} disabled={nextDisabled}>
        Далі <ArrowRightSquareFill />
      </button>

      <h1 className='mt-4 mb-2'>Попередній перегляд таблиці</h1>
      <ResultsTablePreview />
    </div>
  );
};

export default CriteriaEditPage;

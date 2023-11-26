import { useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import api from '../api/action-cable';

import Header from '../components/results-table-header';
import ResultForm from '../components/result-form';
import CommentForm from '../components/comment-form';
import UserSum from '../components/user-sum';
import UserResult from '../components/user-result';
import { buildCriteria } from '../models/criterion';

export const DataX = ({ users, criteria }) => <>
  {users.map((secret, index) => (
    <tr key={secret}>
      <td className='bg-info'>{index + 1}</td>
      <td className='sticky-left bg-info'>{secret}</td>
      {criteria.map(criterion => (
        <td key={criterion.id} className={criterion.className}>
          <ResultForm user={secret} criterion={criterion.id} max={criterion.limit} />
        </td>
      ))}
      <td>
        <UserSum user={secret} />
      </td>
      <td>
        <UserResult user={secret} />
      </td>
      <td>
        <CommentForm user={secret} />
      </td>
    </tr>
  ))}
</>;

const ResultsEditPage = () => {
  const readOnly = useSelector(s => s.app.readOnly);
  const contest_name = useSelector(s => s.app.contest_name);
  const task_name = useSelector(s => s.app.task_name);
  const users = useSelector(s => s.users);
  const criteriaProps = useSelector(s => s.criteria, shallowEqual);
  const rmValue = useSelector(s => s.resultMultiplier).split('/');
  const rmNumerator = parseInt(rmValue[0]);
  const rmDenominator = rmValue[1] ? parseInt(rmValue[1]) : 1;
  const [criteria, headerRows] = buildCriteria(criteriaProps, rmNumerator, rmDenominator);

  const finishCriterion = useCallback(
    () => window.confirm(`Ви дійсно бажаєте завершити перевірку завдання "${task_name}"?`) && api.perform('finish'),
    [task_name]
  );

  return (
    <div className='p-2'>
      <h2 className='mb-2'>Змагання: {contest_name}</h2>
      <h2 className='mb-2'>Задача: {task_name}</h2>
      {readOnly && <div className='alert alert-warning'>Перевірку завершено</div>}

      <table className='table table-bordered table-hover border-dark with-sticky'>
        <thead className='align-middle text-center sticky-top bg-white'>
          <Header rows={headerRows} />
        </thead>
        <tbody className='align-middle text-center'>
          <DataX users={users} criteria={criteria} />
        </tbody>
      </table>

      {!readOnly && <div className='d-grid gap-2 mt-1'>
        <button className='btn btn-primary' onClick={finishCriterion}>Завершити перевірку</button>
      </div>}
    </div>
  );
};

export default ResultsEditPage;

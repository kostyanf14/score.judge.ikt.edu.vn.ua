import { shallowEqual, useSelector } from 'react-redux';

import Header from '../components/results-table-header';
import ResultForm from '../components/result-form';
import CommentForm from '../components/comment-form';
import UserSum from '../components/user-sum';
import { buildCriteria } from '../models/criterion';

export const DataX = ({ users, criteria }) => <>
  {users.map(secret => (
    <tr key={secret}>
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
        <CommentForm user={secret} />
      </td>
    </tr>
  ))}
</>;

const ResultsEditPage = () => {
  const contest_name = useSelector(s => s.app.contest_name);
  const task_name = useSelector(s => s.app.task_name);
  const users = useSelector(s => s.users);
  const criteriaProps = useSelector(s => s.criteria, shallowEqual);
  const [criteria, headerRows] = buildCriteria(criteriaProps);

  return (
    <div className='p-2'>
      <h2 className='mb-2'>Змагання: {contest_name}</h2>
      <h2 className='mb-2'>Задача: {task_name}</h2>

      <table className='table table-bordered table-hover border-dark with-sticky'>
        <thead className='align-middle text-center sticky-top bg-white'>
          <Header rows={headerRows} />
        </thead>
        <tbody className='align-middle text-center'>
          <DataX users={users} criteria={criteria} />
        </tbody>
      </table>
    </div>
  );
};

export default ResultsEditPage;

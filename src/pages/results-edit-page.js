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
  const users = useSelector(s => s.users);
  const criteriaProps = useSelector(s => s.criteria, shallowEqual);
  const [criteria, headerRows] = buildCriteria(criteriaProps);

  return (
    <table className='table table-bordered table-hover border-dark with-sticky'>
      <thead className='align-middle text-center sticky-top bg-white'>
        <Header rows={headerRows} />
      </thead>
      <tbody className='align-middle text-center'>
        <DataX users={users} criteria={criteria} />
      </tbody>
    </table>
  );
};

export default ResultsEditPage;

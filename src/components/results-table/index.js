import { useSelector } from 'react-redux';
import { buildCriteria } from '../../models/criterion';

export const Header = ({ rows }) => <>
  {rows.map((row, i) => (
    <tr key={i}>
      {row.map(({ key, text, className, colSpan, rowSpan }) => (
        <th key={key} className={className} colSpan={colSpan} rowSpan={rowSpan}>{text}</th>
      ))}
    </tr>
  ))}
</>;

export const DataX = ({ users, criteria }) => <>
  {users.map(secret => (
    <tr key={secret}>
      <td className='sticky-left bg-info'>{secret}</td>
      {criteria.map(criterion => (
        <td key={criterion.id} className={criterion.className}>
          <div className='input-group'>
            <input className='form-control' type='number' style={{ width: 80 }} min={0} max={criterion.limit} />
          </div>
        </td>
      ))}
      <td>
        <div className='input-group'>
          100.0
        </div>
      </td>
      <td>
        <div className='input-group'>
          <input className='form-control' style={{ width: 400 }} value='No tasks' />
        </div>
      </td>
    </tr>
  ))}
</>;

const ResultsTable = () => {
  const users = useSelector(s => s.users);
  const criteriaProps = useSelector(s => s.criteria);
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

export default ResultsTable;

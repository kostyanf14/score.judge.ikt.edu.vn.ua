import { buildCriteria } from '../../models/criterion';

const USERS = [
  { id: 1, secret: 'AA1111' },
  { id: 2, secret: 'AB1234' },
  { id: 3, secret: 'XY2345' },
  { id: 4, secret: 'ZZ9999' }
];

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
  {users.map(user => (
    <tr key={user.id}>
      <td>{user.secret}</td>
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

const ResultsTable = ({ criteria: criteriaProps }) => {
  const [criteria, headerRows] = buildCriteria(criteriaProps);

  return (
    <div className='p-2'>
      <table className='table table-bordered table-hover border-dark'>
        <thead className='align-middle text-center'>
          <Header rows={headerRows} />
        </thead>
        <tbody className='align-middle text-center'>
          <DataX users={USERS} criteria={criteria} />
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;

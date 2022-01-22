import { buildCriteria } from '../../models/criterion';

const USERS = [
  { id:  1, secret: 'AA11101' },
  { id:  2, secret: 'AB12302' },
  { id:  3, secret: 'XY23403' },
  { id:  4, secret: 'ZZ99904' },
  { id:  5, secret: 'ZZ99905' },
  { id:  6, secret: 'ZZ99906' },
  { id:  7, secret: 'ZZ99907' },
  { id:  8, secret: 'ZZ99908' },
  { id:  9, secret: 'ZZ99909' },
  { id: 10, secret: 'ZZ99910' },
  { id: 11, secret: 'ZZ99911' },
  { id: 12, secret: 'ZZ99912' },
  { id: 13, secret: 'ZZ99913' },
  { id: 14, secret: 'ZZ99914' },
  { id: 15, secret: 'ZZ99915' },
  { id: 16, secret: 'ZZ99916' },
  { id: 17, secret: 'ZZ99917' },
  { id: 18, secret: 'ZZ99918' },
  { id: 19, secret: 'ZZ99919' },
  { id: 20, secret: 'ZZ99920' },
  { id: 21, secret: 'ZZ99921' },
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
      <td className='sticky-left bg-info'>{user.secret}</td>
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
    <table className='table table-bordered table-hover border-dark with-sticky'>
      <thead className='align-middle text-center sticky-top bg-white'>
        <Header rows={headerRows} />
      </thead>
      <tbody className='align-middle text-center'>
        <DataX users={USERS} criteria={criteria} />
      </tbody>
    </table>
  );
};

export default ResultsTable;

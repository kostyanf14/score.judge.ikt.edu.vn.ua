const buildHeaderRows = criteria => {
  const data = criteria.map(({ name }) => name.split('/').map(n => n.trim()));
  const maxDepth = Math.max.apply(null, data.map(n => n.length));
  const headers = [[{ name: 'Код', rowSpan: maxDepth + 1, colSpan: 1 }]];

  for (const names of data) {
    for (let i = 0; i < maxDepth; i++) {
      if (!headers[i])
        headers[i] = [];

      const name = names[i];
      const lvl = headers[i];

      if (lvl.length === 0 || name !== lvl[lvl.length - 1].name) {
        const rowSpan = (names.length - 1) === i ? (maxDepth - i) : 1;
        lvl.push({ name, rowSpan, colSpan: 1 });
      } else {
        lvl[lvl.length - 1].colSpan++;
      }
    }
  }

  headers[0].push({ name: 'Коментар', rowSpan: maxDepth + 1, colSpan: 1 });

  return headers;
};

export const Header = ({ criteria }) => <>
  {buildHeaderRows(criteria).map(row => (
    <tr>
      {row.filter(c => c.name).map(({ colSpan, rowSpan, name }) => (
        <th colSpan={colSpan} rowSpan={rowSpan}>{name}</th>
      ))}
    </tr>
  ))}
  <tr>
    {criteria.map(({ id, limit }) => <th key={id}>{limit}</th>)}
  </tr>
</>;

const CODES = ['AA1111', 'AB1234', 'XY2345', 'ZZ9999']

export const DataX = ({ criteria }) => <>
  {CODES.map(( cd ) => <tr>
    <td>{cd}</td>
    {criteria.map(({ limit, color }) => <td className={color}>
      <div className="input-group">
        <input className="form-control" type='number' style={{minWidth: '80px'}} max={limit} />
      </div>
    </td>)}
    <td>
      <div className="input-group">
        100.0
      </div>
    </td>
    <td>
      <div className="input-group">
        <input className="form-control" style={{minWidth: '128px'}} value="No tasks" />
      </div>
    </td>
  </tr>)}
</>;


const ResultsTable = ({ criteria }) => (
  <div className='p-2'>
    <table className='table table-bordered border-dark'>
      <thead className='align-middle text-center'>
        <Header criteria={criteria} />
      </thead>
      <tbody className='align-middle text-center'>
        <DataX criteria={criteria} />
      </tbody>
    </table>
  </div>
);

export default ResultsTable;

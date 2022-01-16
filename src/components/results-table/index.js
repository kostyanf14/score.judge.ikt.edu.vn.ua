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


const ResultsTable = ({ criteria }) => (
  <div className='p-2'>
    <table className='table table-bordered border-dark'>
      <thead className='align-middle text-center'>
        <Header criteria={criteria} />
      </thead>
    </table>
  </div>
);

export default ResultsTable;

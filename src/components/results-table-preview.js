import { useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { utils, writeFileXLSX } from 'xlsx';

import Header from './results-table-header';
import { buildCriteria } from '../models/criterion';

const ResultsTablePreview = () => {
  const criteriaProps = useSelector(s => s.criteria, shallowEqual);
  const rmValue = useSelector(s => s.resultMultiplier).split('/');
  const tableRef = useRef(null);

  if (!criteriaProps.length) return null;

  const rmNumerator = parseInt(rmValue[0]);
  const rmDenominator = rmValue[1] ? parseInt(rmValue[1]) : 1;

  const [criteria, headerRows] = buildCriteria(criteriaProps, rmNumerator, rmDenominator);

  const exportXLSX = () => {
    const wb = utils.table_to_book(tableRef.current);
    writeFileXLSX(wb, 'criteria.xlsx');
  };

  return <>
    <table ref={tableRef} className='table table-bordered table-hover border-dark with-sticky'>
      <thead className='align-middle text-center'>
        <Header rows={headerRows} criteria={criteria} />
      </thead>
    </table>
    <button className='btn btn-primary d-block w-100 text-center' onClick={exportXLSX}>Експортувати критерії в XLSX</button>
  </>;
};

export default ResultsTablePreview;

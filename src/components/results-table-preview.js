import Header from './results-table-header';
import { buildCriteria } from '../models/criterion';
import { shallowEqual, useSelector } from 'react-redux';

const ResultsTablePreview = () => {
  const criteriaProps = useSelector(s => s.criteria, shallowEqual);
  const rmValue = useSelector(s => s.resultMultiplier).split('/');

  if (!criteriaProps.length) return null;

  const rmNumerator = parseInt(rmValue[0]);
  const rmDenominator = rmValue[1] ? parseInt(rmValue[1]) : 1;

  const [criteria, headerRows] = buildCriteria(criteriaProps, rmNumerator, rmDenominator);
  return (
    <table className='table table-bordered table-hover border-dark with-sticky'>
      <thead className='align-middle text-center'>
        <Header rows={headerRows} criteria={criteria} />
      </thead>
    </table>
  );
};

export default ResultsTablePreview;

import { Header } from './results-table';
import { buildCriteria } from '../models/criterion';
import { shallowEqual, useSelector } from 'react-redux';

const ResultsTablePreview = () => {
  const criteriaProps = useSelector(s => s.criteria, shallowEqual);
  if (!criteriaProps.length) return null;

  const [criteria, headerRows] = buildCriteria(criteriaProps);
  return (
    <table className='table table-bordered table-hover border-dark with-sticky'>
      <thead className='align-middle text-center'>
        <Header rows={headerRows} criteria={criteria} />
      </thead>
    </table>
  );
};

export default ResultsTablePreview;

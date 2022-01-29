import { Header } from './results-table';
import { buildCriteria } from '../models/criterion';

const ResultsTablePreview = ({ criteria: criteriaProps }) => {
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

import { useState } from 'react';
import { useSelector } from 'react-redux';

import CriteriaEditPage from './pages/criteria-edit-page';
import ResultsTable from './components/results-table';

const App = () => {
  const isReady = useSelector(s => s.app.isReady);
  const [step, setStep] = useState('criteria');

  if (!isReady) {
    return <p>Loading ...</p>;
  }

  switch (step) {
    case 'criteria':
      return <CriteriaEditPage next={() => setStep('results')} />;

    case 'results':
      return <ResultsTable />;

    default:
      return null;
  }
};

export default App;

import { useState } from 'react';
import { useSelector } from 'react-redux';

import CriteriaEditPage from './pages/criteria-edit-page';
import ResultsEditPage from './pages/results-edit-page';

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
      return <ResultsEditPage />;

    default:
      return null;
  }
};

export default App;

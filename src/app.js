import { useState } from 'react';

import CriteriaList from './components/criteria-list';
import ResultsTable from './components/results-table';

const testCriteria = [
  { id: '2', limit: 50, name: 'c1 / t1 / x1' },
  { id: '1', limit: 10, name: 'a0 / b1' },
  { id: '3', limit: 20, name: 'c1 / t1 / x2' },
  { id: '4', limit: 15, name: 'c1 / t2' },
  { id: '5', limit: 40, name: 'c2' },
];

const App = () => {
  const [step, setStep] = useState('criteria');
  const [criteria, setCriteria] = useState(testCriteria);

  switch (step) {
    case 'criteria':
      return <CriteriaList nextStep={() => setStep('results')} criteria={criteria} setCriteria={setCriteria} />;

    case 'results':
      return <ResultsTable criteria={criteria} />;

    default:
      return null;
  }
};

export default App;

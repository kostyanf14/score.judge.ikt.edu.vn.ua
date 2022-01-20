import { useState } from 'react';

import CriteriaList from './components/criteria-list';
import ResultsTable from './components/results-table';

const testCriteria = [
  { id: '01', limit: 2, name: 'стіл / стільниця' },
  { id: '02', limit: 4, name: 'стіл / ніжки і рамка / елементи' },
  { id: '03', limit: 2, name: 'стіл / ніжки і рамка / градіент' },
  { id: '04', limit: 2, name: 'стіл / маркер' },
  { id: '05', limit: 6, name: 'візок / тіло' },
  { id: '06', limit: 6, name: 'візок / колеса' },
  { id: '07', limit: 2, name: 'візок / пружина' },
  { id: '08', limit: 2, name: 'нитка (з текстурою)' },
  { id: '09', limit: 2, name: 'коробок / фото' },
  { id: '10', limit: 2, name: 'коробок / текстура' },
  { id: '11', limit: 2, name: 'коробок / ребра (пунктир)' },
  { id: '12', limit: 2, name: 'стрілки / фігура' },
  { id: '13', limit: 2, name: 'стрілки / градієнт' },
  { id: '14', limit: 2, name: 'поява коробки' },
  { id: '15', limit: 2, name: 'сірник вліво' },
  { id: '16', limit: 2, name: 'одночасно візки розїзждаються (колеса крутяться)' },
  { id: '17', limit: 2, name: 'одночасна поява стрілок' },
  { id: '18', limit: 2, name: 'поява досліду 2 (вихідне положення)' },
  { id: '19', limit: 2, name: 'поява коробки' },
  { id: '20', limit: 2, name: 'поява сірника з вогнем' },
  { id: '21', limit: 2, name: 'зникнення та поясва сірника з вогнем' },
  { id: '22', limit: 2, name: 'одночасно візки розїзждаються (навантажений візок зупиняється пізніше)' },
  { id: '23', limit: 2, name: 'одночасна поява стрілок' },
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

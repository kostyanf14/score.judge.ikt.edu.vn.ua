import { shallowEqual, useSelector } from 'react-redux';
import { round } from 'lodash';

const UserSum = ({ user }) => {
  const values = useSelector(
    s => s.results[user] && Object.values(s.results[user]).map(r => r.value).filter(x => x).map(parseFloat),
    shallowEqual
  );

  const sum = values && values.reduce((x, y) => x + y, 0);

  return (
    <div className='input-group'>
      {sum && round(sum, 2)}
    </div>
  );
};

export default UserSum;

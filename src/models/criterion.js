import { compact } from 'lodash';
import RoundRobinIterator from '../utils/round-robin-iterator';

class Criterion {
  constructor(props) {
    this.id = props.id;
    this.limit = props.limit;
    this.className = props.className;
    this.nameLevels = props.name.split('/').map(l => l.trim());
  }

  setColor(value) {
    this.className = value && `bg-${value} bg-opacity-25`;
  }
}

const buildInfoCell = (text, maxDepth, className = 'bg-info bg-opacity-25') =>
  ({ text, key: text, rowSpan: maxDepth + 1, className });

export const buildCriteria = props => {
  const criteria = props.map(p => new Criterion(p));
  const maxDepth = Math.max.apply(null, criteria.map(c => c.nameLevels.length));

  const headerRows = Array.from({ length: maxDepth + 1 }, () => []);
  headerRows[0].push(buildInfoCell('#', maxDepth, 'bg-info'));
  headerRows[0].push(buildInfoCell('Код', maxDepth, 'bg-info sticky-left'));

  const colors = new RoundRobinIterator(['primary', 'secondary', 'success', 'warning']);

  for (const criterion of criteria) {
    criterion.setColor(colors.current);

    for (let i = 0; i < criterion.nameLevels.length; i++) {
      const text = criterion.nameLevels[i];
      const headerRow = headerRows[i];
      const lastHeaderCol = headerRow.at(-1);

      if (!lastHeaderCol || text !== lastHeaderCol.text) {
        // change color only if we have a new top level column
        if (i === 0) criterion.setColor(colors.next());

        headerRow.push({
          text,
          key: criterion.id,
          className: criterion.className,
          rowSpan: (criterion.nameLevels.length - 1) === i ? (maxDepth - i) : 1,
          colSpan: 1,
        });
      } else {
        lastHeaderCol.colSpan++;
      }
    }

    for (let i = criterion.nameLevels.length; i < maxDepth; i++) {
      const headerRow = headerRows[i];
      if (headerRow.at(-1) !== undefined) headerRow.push(undefined);
    }
  }

  headerRows[0].push(buildInfoCell('Cума', maxDepth - 1));
  headerRows[0].push(buildInfoCell('Коментар', maxDepth));
  headerRows[maxDepth] = criteria.map(({ id, limit, className }) => ({ key: id, text: limit, className }));
  const sum = criteria.map(item => item.limit).filter(x => x).reduce((prev, next) => prev + parseFloat(next), 0);
  headerRows[maxDepth].push({ key: 'id', text: sum, className: 'bg-info bg-opacity-25' })

  return [criteria, headerRows.map(compact)];
};

export default Criterion;

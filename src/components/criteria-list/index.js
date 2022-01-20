import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { uniqueId } from 'lodash';

import Criterion from '../criterion';
import { Header, DataX } from '../results-table';

const CriteriaList = ({ nextStep, criteria, setCriteria }) => {
  const addCriterion = () =>
    setCriteria([...criteria, { id: uniqueId('criterion-'), name: '', limit: 0 }]);

  const removeCriterion = index =>
    setCriteria([...criteria.slice(0, index), ...criteria.slice(index + 1)]);

  const handleCriterionChange = (index, newCriterion) =>
    setCriteria([...criteria.slice(0, index), newCriterion, ...criteria.slice(index + 1)]);

  const handleOnDragEnd = ({ source: src, destination: dst }) => {
    const newCriteria = [...criteria];
    newCriteria.splice(src.index, 1);
    newCriteria.splice(dst.index, 0, criteria[src.index]);
    setCriteria(newCriteria);
  };

  return (
    <div className='p-2'>
      <h1 className='mb-2'>Критерії</h1>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='criteria'>
          {drop => (
            <div {...drop.droppableProps} ref={drop.innerRef}>
              {criteria.map((c, i) => (
                <Draggable key={c.id} draggableId={c.id} index={i}>
                  {drag => (
                    <div ref={drag.innerRef} {...drag.draggableProps} {...drag.dragHandleProps}>
                      <Criterion
                        index={i}
                        criterion={c}
                        onChange={handleCriterionChange}
                        onRemove={removeCriterion} />
                    </div>
                  )}
                </Draggable>
              ))}
              {drop.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className='d-grid gap-2 mt-1'>
        <button className='btn btn-primary' onClick={addCriterion}>Додати критерій</button>
        <button className='btn btn-secondary' onClick={nextStep}>Далі</button>
      </div>

      <h1 className='mt-4 mb-2'>Попередній перегляд таблиці</h1>

      <table className='table table-bordered  table-hover  border-dark'>
        <thead className='align-middle text-center'>
          <Header criteria={criteria} />
        </thead>
        <tbody className='align-middle text-center'>
          <DataX criteria={criteria} />
        </tbody>
      </table>
    </div>
  );
};

export default CriteriaList;

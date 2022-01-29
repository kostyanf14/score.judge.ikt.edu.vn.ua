import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import CriterionForm from '../components/criterion-form';
import ResultsTablePreview from '../components/results-table-preview';
import ApiContext from '../api/context';
import criteriaSlice from '../state/criteria';

const CriteriaEditPage = ({ next }) => {
  const criteria = useSelector(s => s.criteria);
  const dispatch = useDispatch();
  const apiPerform = useContext(ApiContext);

  const addCriterion = () => apiPerform('add_criterion');

  const handleOnDragEnd = ({ source: { index: from }, destination: { index: to } }) => {
    dispatch(criteriaSlice.actions.dragDrop({ from, to }));
    apiPerform('drag_drop', { from, to });
  };

  return (
    <div className='p-2'>
      <h1 className='mb-2'>Критерії</h1>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='criteria'>
          {drop => (
            <div {...drop.droppableProps} ref={drop.innerRef}>
              {criteria.map((c, i) => (
                <Draggable key={c.id} draggableId={c.id.toString()} index={i}>
                  {drag => (
                    <div ref={drag.innerRef} {...drag.draggableProps} {...drag.dragHandleProps}>
                      <CriterionForm criterion={c} />
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
        <button className='btn btn-secondary' onClick={next}>Далі</button>
      </div>

      <h1 className='mt-4 mb-2'>Попередній перегляд таблиці</h1>
      <ResultsTablePreview criteria={criteria} />
    </div>
  );
};

export default CriteriaEditPage;

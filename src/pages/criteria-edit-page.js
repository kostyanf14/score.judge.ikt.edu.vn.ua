import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import CriterionForm from '../components/criterion-form';
import ResultsTablePreview from '../components/results-table-preview';
import api from '../api/action-cable';
import criteriaSlice from '../state/criteria';

const CriteriaEditPage = ({ next }) => {
  const criteriaIds = useSelector(s => s.criteria.map(c => c.id), shallowEqual);
  const nextDisabled = useSelector(s => s.criteria.some(c => c.dirty));
  const dispatch = useDispatch();

  const addCriterion = useCallback(() => api.perform('add_criterion'), []);

  const handleOnDragEnd = useCallback(
    ({ source: { index: from }, destination: { index: to } }) => {
      dispatch(criteriaSlice.actions.dragDrop({ from, to }));
      api.perform('drag_drop', { from, to });
    },
    [dispatch]
  );

  const handleNext = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    next();
  }, [next]);

  const contest_name = useSelector(s => s.app.contest_name);
  const task_name = useSelector(s => s.app.task_name);

  return (
    <div className='p-2'>
      <h1 className='mb-2'>Критерії</h1>
      <h2 className='mb-2'>Змагання: {contest_name}</h2>
      <h2 className='mb-2'>Задача: {task_name}</h2>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='criteria'>
          {drop => (
            <div {...drop.droppableProps} ref={drop.innerRef}>
              {criteriaIds.map((id, index) => (
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {drag => (
                    <div ref={drag.innerRef} {...drag.draggableProps} {...drag.dragHandleProps}>
                      <CriterionForm id={id} />
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
        <button className='btn btn-secondary' onClick={handleNext} disabled={nextDisabled}>Далі</button>
      </div>

      <h1 className='mt-4 mb-2'>Попередній перегляд таблиці</h1>
      <ResultsTablePreview />
    </div>
  );
};

export default CriteriaEditPage;

import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PlusSquareFill } from 'react-bootstrap-icons';

import api from '../api/action-cable';
import criteriaSlice from '../state/criteria';

import CriterionForm from './criterion-form';


const CriteriaListAccordionItem = () => {
  const readOnly = useSelector(s => s.app.readOnly);
  const criteriaIds = useSelector(s => s.criteria.map(c => c.id), shallowEqual);
  const dispatch = useDispatch();

  const handleOnDragEnd = useCallback(
    ({ source: { index: from }, destination: { index: to } }) => {
      dispatch(criteriaSlice.actions.dragDrop({ from, to }));
      api.perform('drag_drop', { from, to });
    },
    [dispatch]
  );

  const addCriterion = useCallback(() => api.perform('add_criterion'), []);

  return (
    <div className='accordion-item'>
      <h2 className='accordion-header'>
        <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#criteria-list'
          aria-expanded='false' aria-controls='criteria-list'>
          Критерії
        </button>
      </h2>

      <div id='criteria-list' className='accordion-collapse collapse' data-bs-parent='#page-accordion'>
        <div className='accordion-body'>
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

          <button className='btn btn-secondary mt-1 d-block w-100 text-center' onClick={addCriterion} disabled={readOnly}>
            Додати критерій <PlusSquareFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CriteriaListAccordionItem;

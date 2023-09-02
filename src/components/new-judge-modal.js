import { useCallback, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { PlusSquareFill } from 'react-bootstrap-icons';

import api from '../api/action-cable';
import Modal from './modal';

const NAME = 'new-judge';

const NewJudgeModalButton = () => {
  const readOnly = useSelector(s => s.app.readOnly);

  return (
    <Modal.Button name={NAME} className='btn btn-secondary mt-1 d-block w-100 text-center' disabled={readOnly}>
      Додати члена журі <PlusSquareFill />
    </Modal.Button>
  );
};

const NewJudgeModal = () => {
  const readOnly = useSelector(s => s.app.readOnly);
  const [value, setValue] = useState('');
  const valueInputRef = useRef(null);

  const onModalHide = useCallback(() => setValue(''), [setValue]);
  const onModalShow = useCallback(() => valueInputRef.current?.focus(), [valueInputRef]);
  const onValueChange = useCallback(e => setValue(e.target.value), [setValue]);
  const performSubmit = useCallback(e => { e.preventDefault(); api.perform('add_judge', { value }); }, [value]);

  return (
    <Modal name={NAME} onShow={onModalShow} onHide={onModalHide}>
      <form onSubmit={performSubmit}>
        <Modal.Header title='Додати члена журі' />
        <Modal.Body>
          <div className='form-floating'>
            <input className='form-control' type='text' ref={valueInputRef}
              disabled={readOnly} value={value} onChange={onValueChange} />
            <label>Ім'я</label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type='submit' className='btn btn-primary' data-bs-dismiss="modal">
            Додати
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

NewJudgeModal.Button = NewJudgeModalButton;

export default NewJudgeModal;

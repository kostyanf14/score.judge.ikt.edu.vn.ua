import { useEffect, useRef } from 'react';

const ModalButton = ({ name, children, ...buttonProps }) => (
  <button type='button' data-bs-toggle='modal' data-bs-target={`#${name}`} {...buttonProps}>
    {children}
  </button>
);

const ModalHeader = ({ title }) => (
  <div className='modal-header'>
    <h2 className='modal-title fs-5'>{title}</h2>
    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
  </div>
);

const ModalBody = ({ children }) => (
  <div className='modal-body'>
    {children}
  </div>
);

const ModalFooter = ({ children }) => (
  <div className='modal-footer'>
    {children}
  </div>
);

const Modal = ({ name, onShow, onHide, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (onShow && modalRef.current) {
      const element = modalRef.current;
      element.addEventListener('shown.bs.modal', onShow);
      return () => element.removeEventListener('shown.bs.modal', onShow);
    }
  }, [onShow, modalRef]);

  useEffect(() => {
    if (onHide && modalRef.current) {
      const element = modalRef.current;
      element.addEventListener('hidden.bs.modal', onHide);
      return () => element.removeEventListener('hidden.bs.modal', onHide);
    }
  }, [onHide, modalRef]);

  return (
    <div ref={modalRef} className='modal fade' id={name} tabIndex='-1' aria-hidden='true'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.Button = ModalButton;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;

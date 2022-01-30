import { createConsumer } from '@rails/actioncable';
import { toast } from 'react-toastify';

const task = window.location.pathname.slice(1);
const password = prompt('Enter judge password');
const url = `${process.env.REACT_APP_API_ENDPOINT}?password=${password}&task_id=${task}`;
const consumer = createConsumer(url);

if (!task) {
  toast.error('Incorrect URL - no task id');
}

export const connect = (store) => {
  let promiseResolve;
  const received = data => {
    store.dispatch(data);
    if (promiseResolve) {
      promiseResolve(data);
      promiseResolve = null;
    }
  };

  const connected = () => toast.success('Successfully connected to the server.', { autoClose: 2000 });
  const disconnected = () => toast.error('Disconnected from the server.');
  const rejected = () => toast.error('Connection was rejected by the server.');

  const client = consumer.subscriptions.create(
    { channel: 'ApiChannel' },
    { received, connected, disconnected, rejected }
  );

  return (action, data) => new Promise((resolve, reject) => {
    promiseResolve = resolve;
    const success = client.perform(action, data);
    if (!success) {
      reject();
    }
  });
};

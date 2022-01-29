import { createConsumer } from '@rails/actioncable';

const password = prompt('Enter judge password');
const url = `${process.env.REACT_APP_API_ENDPOINT}?password=${password}`;
const consumer = createConsumer(url);

export const connect = (task, store) => {
  let promiseResolve;

  const received = data => {
    store.dispatch(data);

    if (promiseResolve) {
      promiseResolve(data);
      promiseResolve = null;
    }
  };

  const client = consumer.subscriptions.create({ channel: 'ApiChannel', task }, { received });

  return (action, data) => new Promise((resolve, reject) => {
    promiseResolve = resolve;
    const success = client.perform(action, data);
    if (!success) {
      reject();
    }
  });
};

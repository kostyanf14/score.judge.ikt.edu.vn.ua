import { createConsumer } from '@rails/actioncable';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import store from '../state';

export const clientId = uuidv4();
export const task = window.location.pathname.slice(1);
let url = `${process.env.REACT_APP_API_ENDPOINT}?task_id=${task}&client_id=${clientId}`;

const currentUrl = new URL(window.location.href);
const token = currentUrl.searchParams.get("token");

if (!token) {
  const password = prompt('Enter judge password');
  url += `&password=${password}`
} else {
  url += `&token=${token}`
}
const consumer = createConsumer(url);

if (!task) {
  toast.error('Incorrect URL - no task id');
}

const received = store.dispatch.bind(store);
const connected = () => toast.success('Successfully connected to the server.', { autoClose: 2000 });
const disconnected = () => toast.error('Disconnected from the server.');
const rejected = () => toast.error('Connection was rejected by the server.');

const client = consumer.subscriptions.create(
  { channel: 'ApiChannel' },
  { received, connected, disconnected, rejected }
);

export default client;

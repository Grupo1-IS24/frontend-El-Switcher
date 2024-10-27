import { toast, Flip } from 'react-toastify';

/**
 * Default configuration for toast notifications.
 * @type {Object}
 */
const defaultConfig = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: true,
  progress: undefined,
  theme: 'colored',
  transition: Flip,
};

/**
 * Displays a toast notification with the specified type and message.
 * @param {Object} params - Parameters for the notification.
 * @param {string} params.type - Type of notification ('success', 'error', 'info', 'warning').
 * @param {string} params.message - Message to display in the notification.
 * @param {number} [params.autoClose=5000] - Time in milliseconds before the notification automatically closes.
 */
const showToast = ({ type = '', message, autoClose = 5000 }) => {
  const config = { ...defaultConfig, autoClose };

  switch (type) {
    case 'success':
      toast.success(message, config);
      break;
    case 'error':
      toast.error(message, config);
      break;
    case 'info':
      toast.info(message, config);
      break;
    case 'warning':
      toast.warn(message, config);
      break;
    default:
      toast(message, config);
      break;
  }
};

export default showToast;

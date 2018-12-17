import { toast } from 'react-toastify';
import { css } from 'glamor';

export default {
  // Keep the signature of the original toast object
  // Doing so you can pass additionnal options
  success(msg, options = {}) {
    return toast.success(msg, {
      // Merge additionals options
      ...options,
      className: {
        color: '#20232a',
        minHeight: '60px',
        borderRadius: '5px',
        background: '#61dafb',
        boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)',
        fontSize: '14px'
      },
      progressClassName: css({
        background: '#a9a9a9'
      })
    });
  },
  error(msg, options = {}) {
    return toast.error(msg, {
      ...options,
      className: {
        color: '#fff',
        minHeight: '60px',
        borderRadius: '8px',
        boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)'
      },
      progressClassName: css({
        background: '#a9a9a9'
      })
    });
  }
};

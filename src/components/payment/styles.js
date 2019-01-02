export const cardElementOptions = () => {
  return {
    style: {
      base: {
        fontSize: '15px',
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };
};

export const formStyles = () => {
  return {
    style: {
      height: '100%',
      backgroundColor: '#fbfbfb',
      padding: '5px',
      margin: '15px 0'
    }
  };
};

export const paragraphStyle = () => {
  return {
    style: { marginTop: '5px', fontSize: '12px', color: '#aab7c4' }
  };
};

export const buttonStyles = () => {
  return {
    style: {
      margin: '25px 0 15px 0'
    }
  };
};

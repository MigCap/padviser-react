import titleize from 'titleize';

export const toUpperCase = value => (value ? titleize(value) : '');

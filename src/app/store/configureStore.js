import * as redux from 'redux';

export const configureStore = () => {
  const store = redux.createStore(() => {
    return {
      rentals: [
        {
          id: 1,
          category: 'audio',
          type: 'Microphone',
          brand: 'Shure',
          model: 'SM58',
          description: 'Classic Mic',
          units: 4,
          conditions: 'ok average',
          city: 'New York',
          street: 'Times Sqaure',
          image: 'http://via.placeholder.com/350x250',
          dailyRate: 34,
          createdAt: '24/12/2017'
        },
        {
          id: 2,
          category: 'video',
          type: 'Proyector',
          brand: 'Shure',
          model: 'SM58',
          description: '5000 Lumens proyector',
          units: 2,
          conditions: 'mint',
          city: 'San Francisco',
          street: 'Main street',
          image: 'http://via.placeholder.com/350x250',
          dailyRate: 12,
          createdAt: '24/12/2017'
        },
        {
          id: 3,
          category: 'lights',
          type: 'Some lighting gear',
          brand: 'Robe',
          model: 'Robe-J3',
          units: 2,
          conditions: 'bad',
          description: 'Some light description',
          city: 'Bratislava',
          street: 'Hlavna',
          image: 'http://via.placeholder.com/350x250',
          dailyRate: 334,
          createdAt: '24/12/2017'
        },
        {
          id: 4,
          category: 'audio',
          type: 'Speaker',
          brand: 'D&B',
          model: 'T10',
          units: 2,
          conditions: 'mint',
          description: 'Nice powerfull speakers',
          city: 'Berlin',
          street: 'Haupt strasse',
          image: 'http://via.placeholder.com/350x250',
          dailyRate: 33,
          createdAt: '24/12/2017'
        }
      ]
    };
  });

  return store;
};

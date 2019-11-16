import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default reducers => {
  const persistedReducers = persistReducer(
    {
      key: 'gympoint',
      storage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistedReducers;
};

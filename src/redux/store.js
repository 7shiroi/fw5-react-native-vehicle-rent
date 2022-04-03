import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import persistStore from 'redux-persist/es/persistStore';
import thunk from 'redux-thunk';
import rootReducers from './reducers';

export default () => {
  const store = createStore(rootReducers, applyMiddleware(thunk, logger));

  const persistor = persistStore(store);

  return {store, persistor};
};

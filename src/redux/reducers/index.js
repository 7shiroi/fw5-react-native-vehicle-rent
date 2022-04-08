import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from './auth';
import messages from './messages';
import loading from './loading';
import persistReducer from 'redux-persist/es/persistReducer';
import categories from './categories';
import transaction from './transaction';
import vehicles from './vehicles';
import filter from './filter';
import history from './history';

const persistAuth = {
  key: 'auth',
  storage: AsyncStorage,
};
const persistCategories = {
  key: 'categories',
  storage: AsyncStorage,
};

const rootReducers = combineReducers({
  auth: persistReducer(persistAuth, auth),
  categories: persistReducer(persistCategories, categories),
  filter,
  history,
  loading,
  messages,
  transaction,
  vehicles,
});

export default rootReducers;

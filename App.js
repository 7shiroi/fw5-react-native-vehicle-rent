import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import reduxStore from './src/redux/store';
import Routes from './src/screens/Routes';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const {store, persistor} = reduxStore();

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log(token);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import InputField from './src/components/InputField';
import {LOGINBG} from './src/assets/images';
import Container from './src/components/Container';
import Button from './src/components/Button';
import globalStyle from './src/assets/style';
import IconFA from 'react-native-vector-icons/FontAwesome';
import HomeHeader from './src/components/HomeHeader';
import HomeSearch from './src/components/HomeSearch';
import NavFooter from './src/components/NavFooter';
import Layout from './src/components/Layout';
import RecommendList from './src/components/RecommendList';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Search from './src/screens/Search';
import BottomTab from './src/screens/BottomTab';
import {
  COLOR_ACCENT,
  COLOR_GREY,
  LOGIN_NAV,
  ORDER_NAV,
  PAYMENT_NAV,
  REGISTER_NAV,
} from './src/helpers/utils';
import UpdateProfile from './src/screens/UpdateProfile';
import {extendTheme, NativeBaseProvider} from 'native-base';
import Order from './src/screens/Order';
import Payment from './src/screens/Payment';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import reduxStore from './src/redux/store';
import Routes from './src/screens/Routes';

const App = () => {
  const {store, persistor} = reduxStore();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },

  gap: {
    width: 10,
  },

  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
  },

  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

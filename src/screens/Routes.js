import {View, Text} from 'react-native';
import React from 'react';
import {extendTheme, NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LOGIN_NAV,
  ORDER_NAV,
  PAYMENT_NAV,
  REGISTER_NAV,
  SEARCH_NAV,
} from '../helpers/utils';
import Login from './Login';
import Register from './Register';
import {useSelector} from 'react-redux';
import BottomTab from './BottomTab';
import UpdateProfile from './UpdateProfile';
import Order from './Order';
import Payment from './Payment';
import Search from './Search';

const Routes = () => {
  const auth = useSelector(state => state.auth);
  const AuthStack = createNativeStackNavigator();
  const MainStack = createNativeStackNavigator();

  const theme = extendTheme({});

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        {!auth.token && (
          <AuthStack.Navigator>
            <AuthStack.Screen
              name={LOGIN_NAV}
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <AuthStack.Screen
              name={REGISTER_NAV}
              component={Register}
              options={{
                headerShown: false,
              }}
            />
          </AuthStack.Navigator>
        )}
        {auth.token && (
          <MainStack.Navigator>
            <MainStack.Screen
              options={{headerShown: false}}
              name="Bottom Tab"
              component={BottomTab}
            />
            <MainStack.Screen
              options={{headerShown: true}}
              name="Update Profile"
              component={UpdateProfile}
            />
            <MainStack.Screen
              options={{headerShown: false}}
              name={ORDER_NAV}
              component={Order}
            />
            <MainStack.Screen
              options={{headerShown: false}}
              name={PAYMENT_NAV}
              component={Payment}
            />
          </MainStack.Navigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default Routes;

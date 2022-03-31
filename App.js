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

const App = () => {
  const AuthStack = createNativeStackNavigator();
  const MainStack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      {/* <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator> */}
      <MainStack.Navigator>
        {/* <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
          }}
        /> */}
        <MainStack.Screen
          options={{headerShown: false}}
          name="Main Menu"
          component={BottomTab}
        />
      </MainStack.Navigator>
    </NavigationContainer>
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

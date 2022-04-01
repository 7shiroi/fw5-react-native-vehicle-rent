import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Search from './Search';

const MainMenu = () => {
  const mainMenuStack = createNativeStackNavigator();
  return (
    <mainMenuStack.Navigator>
      <mainMenuStack.Screen
        options={{headerShown: false}}
        name="Search"
        component={Search}
      />
      <mainMenuStack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <mainMenuStack.Screen
        options={{headerShown: false}}
        name="Category"
        component={Home}
      />
    </mainMenuStack.Navigator>
  );
};

export default MainMenu;

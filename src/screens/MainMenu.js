import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Search from './Search';
import {CATEGORY_NAV, HOME_NAV, SEARCH_NAV} from '../helpers/utils';

const MainMenu = () => {
  const mainMenuStack = createNativeStackNavigator();
  return (
    <mainMenuStack.Navigator>
      <mainMenuStack.Screen
        options={{headerShown: false}}
        name={HOME_NAV}
        component={Home}
      />
      <mainMenuStack.Screen
        options={{headerShown: false}}
        name={SEARCH_NAV}
        component={Search}
      />
      <mainMenuStack.Screen
        options={{headerShown: false}}
        name={CATEGORY_NAV}
        component={Home}
      />
    </mainMenuStack.Navigator>
  );
};

export default MainMenu;

import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Search from './Search';
import {
  ADMIN_ADD_ITEMS,
  FILTER_NAV,
  HOME_NAV,
  SEARCH_NAV,
} from '../helpers/utils';
import Filter from './Filter';
import AddVehicle from './Admin/AddVehicle';

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
        name={FILTER_NAV}
        component={Filter}
      />
      <mainMenuStack.Screen
        options={{headerShown: false}}
        name={ADMIN_ADD_ITEMS}
        component={AddVehicle}
      />
    </mainMenuStack.Navigator>
  );
};

export default MainMenu;

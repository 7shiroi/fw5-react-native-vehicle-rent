import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainMenu from './MainMenu';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{headerShown: false}}
        name="Home Menu"
        component={MainMenu}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

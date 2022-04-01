import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainMenu from './MainMenu';
import Profile from './Profile';
import {MAIN_NAV, PROFILE_NAV} from '../helpers/utils';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{headerShown: false}}
        name={MAIN_NAV}
        component={MainMenu}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name={PROFILE_NAV}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainMenu from './MainMenu';
import Profile from './Profile';
import {CHAT_NAV, HISTORY_NAV, MAIN_NAV, PROFILE_NAV} from '../helpers/utils';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import History from './History';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <IconFeather name="home" size={30} />,
        }}
        name={MAIN_NAV}
        component={MainMenu}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <IconMCI name="note-text-outline" size={30} />,
        }}
        name={HISTORY_NAV}
        component={History}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <IconIonicons name="chatbubble-outline" size={30} />
          ),
        }}
        name={CHAT_NAV}
        component={Profile}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <IconFA name="user-o" size={30} />,
        }}
        name={PROFILE_NAV}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

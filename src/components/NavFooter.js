import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from './Button';
import globalStyles from '../assets/style';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

const NavFooter = () => {
  return (
    <View style={[globalStyles.bgGrey, styles.container]}>
      <Button>
        <IconFeather name="home" size={24} />
      </Button>
      <Button>
        <IconMCI name="note-text-outline" size={24} />
      </Button>
      <Button>
        <IconIonicons name="chatbubble-outline" size={24} />
      </Button>
      <Button>
        <IconFA name="user-o" size={24} />
      </Button>
    </View>
  );
};

export default NavFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
});

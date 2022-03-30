import {StyleSheet, ImageBackground, Dimensions} from 'react-native';
import React from 'react';
import {HOMEHEADER} from '../assets/images/index';

const HomeHeader = () => {
  return <ImageBackground source={HOMEHEADER} style={styles.headerBg} />;
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerBg: {
    height: Dimensions.get('window').height * 0.4,
  },
});

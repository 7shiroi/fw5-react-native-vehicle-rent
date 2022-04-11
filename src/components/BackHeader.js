import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import IconFA from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../assets/style';
import {useNavigation} from '@react-navigation/native';

const BackHeader = ({containerStyle, children}) => {
  const navigate = useNavigation();
  return (
    <View
      style={[
        globalStyles.flexRow,
        globalStyles.mx3,
        globalStyles.my3,
        styles.container,
        containerStyle,
      ]}>
      <TouchableOpacity
        onPress={() => {
          navigate.goBack();
        }}>
        <IconFA name="chevron-left" size={30} />
      </TouchableOpacity>
      <View style={globalStyles.gap5} />
      <Text style={styles.textTitle}>{children}</Text>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
  },
});

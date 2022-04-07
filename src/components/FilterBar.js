import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Container, Flex, Pressable, Spacer} from 'native-base';
import globalStyles from '../assets/style';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {FILTER_NAV} from '../helpers/utils';

const FilterBar = () => {
  const navigate = useNavigation();
  const handleFilter = () => {
    navigate.push(FILTER_NAV);
  };
  return (
    <Pressable
      onPress={handleFilter}
      px={5}
      mt={5}
      pb={3}
      mb={2}
      flexDirection="row"
      alignItems="center"
      borderBottomWidth={2}
      borderBottomColor="black">
      <IconFA name="filter" size={28} />
      <View style={globalStyles.gap3} />
      <Text style={[globalStyles.flex1, styles.filterText]}>Filter</Text>
    </Pressable>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  filterText: {
    fontSize: 24,
  },
});

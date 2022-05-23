import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import Container from './Container';
import IconFa from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../assets/style';
import {DUMMY1, DUMMY2, HOMEHEADER} from '../assets/images/index';
import dummyImage from '../assets/images/dummy1.png';
import {useNavigation} from '@react-navigation/native';
import {COLOR_PRIMARY, ORDER_NAV, TOGGLE_LOADING} from '../helpers/utils';
import {useDispatch, useSelector} from 'react-redux';
import {
  getDetailVehicle,
  getPopularVehiclesAction,
} from '../redux/actions/vehicles';
import {Box, Pressable} from 'native-base';
import IconAD from 'react-native-vector-icons/AntDesign';

const RecommendList = () => {
  const navigate = useNavigation();
  const vehicles = useSelector(state => state.vehicles);

  const goToOrder = id => {
    navigate.push(ORDER_NAV, {id});
  };

  const RecommendItem = ({id, image, ...props}) => {
    return (
      <Pressable
        onPress={() => {
          goToOrder(id);
        }}>
        <Box
          w={264}
          h={168}
          mx={5}
          alignItems="center"
          justifyContent="center"
          backgroundColor={COLOR_PRIMARY}>
          {image ? (
            <Image source={{uri: image}} style={styles.imageItemStyle} />
          ) : (
            <IconAD name="car" size={100} />
          )}
        </Box>
      </Pressable>
    );
  };

  return (
    <View style={[globalStyle.bgSecondary, globalStyle.py3]}>
      <Container style={[styles.titleContainer, globalStyle.mb5]}>
        <Text style={globalStyle.textWhite}>Recommended</Text>
        <View style={styles.viewMore}>
          <Text style={globalStyle.textWhite}>View More</Text>
          <View style={globalStyle.gap2} />
          <IconFa color="#fff" name="chevron-right" size={20} />
        </View>
      </Container>
      <FlatList
        horizontal={true}
        keyExtractor={obj => obj.id}
        data={vehicles.vehiclesData}
        renderItem={obj => {
          return <RecommendItem id={obj.item.id} image={obj.item.image} />;
        }}
      />
    </View>
  );
};

export default RecommendList;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageItem: {
    width: 264,
    height: 168,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageItemStyle: {
    width: 264,
    height: 168,
  },
});

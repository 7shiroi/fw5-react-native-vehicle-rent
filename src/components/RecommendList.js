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
import {ORDER_NAV, TOGGLE_LOADING} from '../helpers/utils';
import {useDispatch, useSelector} from 'react-redux';
import {
  getDetailVehicle,
  getPopularVehiclesAction,
} from '../redux/actions/vehicles';

const RecommendList = () => {
  const navigate = useNavigation();
  const vehicles = useSelector(state => state.vehicles);
  const dispatch = useDispatch();

  const goToOrder = id => {
    console.log(id);
    fetchDetailData(id);
    navigate.push(ORDER_NAV);
  };

  const fetchDetailData = async id => {
    dispatch({type: TOGGLE_LOADING});
    await dispatch(getDetailVehicle(id));
    dispatch({type: TOGGLE_LOADING});
  };

  const RecommendItem = ({id, image, ...props}) => {
    return (
      <TouchableOpacity
        style={styles.imageItem}
        onPress={() => {
          goToOrder(id);
        }}>
        <Image
          source={image ? {uri: image} : DUMMY1}
          style={styles.imageItemStyle}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[globalStyle.bgSecondary, globalStyle.py3]}>
      <Container style={[styles.titleContainer, globalStyle.mb5]}>
        <Text>Recommended</Text>
        <View style={styles.viewMore}>
          <Text>View More</Text>
          <View style={globalStyle.gap2} />
          <IconFa name="chevron-right" size={20} />
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

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import globalStyles from '../assets/style';
import {ORDERDUMMY} from '../assets/images';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconAD from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const OrderHeader = ({isFavorite = false, rating = 0}) => {
  const {detailData} = useSelector(state => state.vehicles);
  const navigate = useNavigation();
  return (
    <View style={[styles.container, globalStyles.bgPrimary]}>
      <ImageBackground
        source={detailData.image ? {uri: detailData.image} : ORDERDUMMY}
        style={[styles.bgImage, globalStyles.flex1]}>
        <View
          style={[styles.headerContainer, globalStyles.mx4, globalStyles.my5]}>
          <TouchableOpacity
            style={globalStyles.flex1}
            onPress={() => {
              navigate.goBack();
            }}>
            <IconFA name="chevron-left" size={20} />
          </TouchableOpacity>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#00ADB5', '#006778']}
            style={[styles.rating, globalStyles.mx3]}>
            <Text style={styles.ratingText}>{rating}</Text>
          </LinearGradient>
          <IconAD
            name={isFavorite ? 'heart' : 'hearto'}
            color={isFavorite ? 'red' : 'white'}
            size={20}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default OrderHeader;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.4,
  },
  bgImage: {
    width: Dimensions.get('window').width,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  rating: {
    width: 50,
    height: 24,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    fontWeight: 'bold',
  },
});

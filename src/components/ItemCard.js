import {StyleSheet, Text, Image, View} from 'react-native';
import React from 'react';
import Container from './Container';
import globalStyle from '../assets/style';
import {stringToIdr} from '../helpers/converter';
import {DUMMY3} from '../assets/images';
import {Box} from 'native-base';
import {COLOR_GREY} from '../helpers/utils';
import IconAD from 'react-native-vector-icons/AntDesign';

const ItemCard = ({data}) => {
  return (
    <Container style={globalStyle.flexRow}>
      <Box
        w={120}
        h={120}
        alignItems="center"
        justifyContent="center"
        backgroundColor={COLOR_GREY}>
        {data.image ? (
          <Image style={styles.imageItem} source={{uri: data.image}} />
        ) : (
          <IconAD name="car" size={70} />
        )}
      </Box>
      <View style={globalStyle.gap2} />
      <View style={styles.itemInfo}>
        <View>
          <Text>{data.name}</Text>
          <Text>
            Max for {data.capacity} {data.capacity > 1 ? 'people' : 'person'}
          </Text>
          <Text>{data.location}</Text>
          <Text
            style={data.is_available ? styles.available : styles.notAvailable}>
            {data.is_available ? 'Available' : 'Not Available'}
          </Text>
        </View>
        <View>
          <Text>Rp {stringToIdr(data.price)}/day</Text>
        </View>
      </View>
    </Container>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  imageItemContainer: {
    width: 120,
    height: 120,
  },
  imageItem: {
    width: 120,
    height: 120,
  },
  available: {
    fontWeight: 'bold',
    color: '#14d106',
  },
  notAvailable: {
    fontWeight: 'bold',
    color: '#ed1a1a',
  },
  itemInfo: {
    justifyContent: 'space-between',
  },
});

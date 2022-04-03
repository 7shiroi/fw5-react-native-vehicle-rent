import {StyleSheet, Text, Image, View} from 'react-native';
import React from 'react';
import Container from './Container';
import globalStyle from '../assets/style';
import {stringToIdr} from '../helpers/converter';
import {DUMMY3} from '../assets/images';

const ItemCard = ({data}) => {
  return (
    <Container style={globalStyle.flexRow}>
      <View style={styles.imageItem}>
        <Image
          style={styles.imageItem}
          source={data.image ? {uri: data.image} : DUMMY3}
        />
      </View>
      <View style={globalStyle.gap2} />
      <View style={styles.itemInfo}>
        <View>
          <Text>{data.name}</Text>
          <Text>
            Max for {data.capacity} {data.capacity > 1 ? 'people' : 'person'}
          </Text>
          <Text>{data.location}</Text>
          <Text
            style={data.isAvailable ? styles.available : styles.notAvailable}>
            {data.isAvailable ? 'Available' : 'Not Available'}
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

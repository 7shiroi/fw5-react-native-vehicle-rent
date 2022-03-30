import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React from 'react';
import Container from './Container';
import IconFa from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../assets/style';
import {DUMMY1, DUMMY2, HOMEHEADER} from '../assets/images/index';
import dummyImage from '../assets/images/dummy1.png';

const data = [
  {id: 1, image: DUMMY2},
  {id: 2, image: DUMMY1},
];

const RecommendList = () => {
  const RecommendItem = ({image, ...props}) => {
    return (
      <View style={styles.imageItem}>
        <Image source={image} />
      </View>
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
        data={data}
        renderItem={obj => {
          return <RecommendItem image={obj.item.image} />;
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
  },
});

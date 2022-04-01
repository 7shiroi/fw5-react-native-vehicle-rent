import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import Layout from '../components/Layout';
import {DUMMY3} from '../assets/images';
import ItemCard from '../components/ItemCard';
import LayoutNoScroll from '../components/LayoutNoScroll';

const DATA = [
  {
    id: 1,
    image: DUMMY3,
    name: 'Dummy',
    capacity: 2,
    location: 'Jakarta',
    isAvailable: true,
    price: 30000,
  },
  {
    id: 2,
    image: DUMMY3,
    name: 'Dummy',
    capacity: 1,
    location: 'Jakarta',
    isAvailable: false,
    price: 30000,
  },
  {
    id: 3,
    image: DUMMY3,
    name: 'Dummy',
    capacity: 2,
    location: 'Jakarta',
    isAvailable: true,
    price: 30000,
  },
  {
    id: 4,
    image: DUMMY3,
    name: 'Dummy',
    capacity: 2,
    location: 'Jakarta',
    isAvailable: true,
    price: 30000,
  },
  {
    id: 5,
    image: DUMMY3,
    name: 'Dummy',
    capacity: 2,
    location: 'Jakarta',
    isAvailable: true,
    price: 30000,
  },
  {
    id: 6,
    image: DUMMY3,
    name: 'Dummy',
    capacity: 2,
    location: 'Jakarta',
    isAvailable: true,
    price: 30000,
  },
  {
    id: 7,
    image: DUMMY3,
    name: 'Dummy',
    capacity: 2,
    location: 'Jakarta',
    isAvailable: true,
    price: 30000,
  },
];

const Search = () => {
  return (
    // <LayoutNoScroll>
    <FlatList data={DATA} renderItem={obj => <ItemCard data={obj.item} />} />
    // {/* </LayoutNoScroll> */}
  );
};

export default Search;

const styles = StyleSheet.create({});

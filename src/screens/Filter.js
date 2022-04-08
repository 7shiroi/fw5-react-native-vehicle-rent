import {StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Flex,
  FormControl,
  HStack,
  Input,
  Modal,
  Switch,
  View,
  VStack,
  Button as ButtonNB,
  Menu,
} from 'native-base';
import BackHeader from '../components/BackHeader';
import globalStyles from '../assets/style';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {CLEAR_FILTER, COLOR_ACCENT, TOGGLE_LOADING} from '../helpers/utils';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';
import {
  getRegisteredLocationsAction,
  getVehiclesAction,
} from '../redux/actions/vehicles';
import {Picker} from 'react-native-wheel-pick';

const Filter = () => {
  const filter = useSelector(state => state.filter);
  const categories = useSelector(state => state.categories);
  const {registeredLocation} = useSelector(state => state.vehicles);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const [search, setSearch] = useState();
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [prepayment, setPrepayment] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [showModalRating, setShowModalRating] = useState(false);
  const [showModalMinPrice, setShowModalMinPrice] = useState(false);
  const [showModalMaxPrice, setShowModalMaxPrice] = useState(false);
  const [showModalType, setShowModalType] = useState(false);

  useEffect(() => {
    fetchLocationData();
  }, []);

  const fetchLocationData = async () => {
    dispatch({type: TOGGLE_LOADING});
    await dispatch(getRegisteredLocationsAction);
    dispatch({type: TOGGLE_LOADING});
  };

  const handleReset = () => {
    dispatch({type: CLEAR_FILTER});
  };
  const handleApplyFilter = () => {
    const filterData = {};
    dispatch(getVehiclesAction(filterData));
  };

  return (
    <VStack flex={1}>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        pr={3}
        borderBottomWidth={2}
        borderBottomColor="black">
        <BackHeader>Filter</BackHeader>
        <Pressable onPress={handleReset}>
          <View backgroundColor="muted.400" px={4} py={2} borderRadius={10}>
            <Text>RESET</Text>
          </View>
        </Pressable>
      </HStack>
      <VStack mx={3} flex={1}>
        <HStack alignItems="center" justifyContent="space-between" py={2}>
          <Text>Search</Text>
          <Pressable
            flexDirection="row"
            onPress={() => {
              setShowModalSearch(true);
            }}>
            <Text> {search ? search : 'Select'}</Text>
            <View style={globalStyles.gap2} />
            <IconFA name="chevron-right" size={20} />
          </Pressable>
        </HStack>
        <HStack alignItems="center" justifyContent="space-between" py={2}>
          <Text>Star Rating</Text>
          <Pressable flexDirection="row">
            <Text>Select</Text>
            <View style={globalStyles.gap2} />
            <IconFA name="chevron-right" size={20} />
          </Pressable>
        </HStack>
        <HStack alignItems="center" justifyContent="space-between" py={2}>
          <Text>Min Price</Text>
          <Pressable
            flexDirection="row"
            onPress={() => {
              setShowModalMinPrice(true);
            }}>
            <Text>{minPrice ? minPrice : 'Select'}</Text>
            <View style={globalStyles.gap2} />
            <IconFA name="chevron-right" size={20} />
          </Pressable>
        </HStack>
        <HStack alignItems="center" justifyContent="space-between" py={2}>
          <Text>Max Price</Text>
          <Pressable
            flexDirection="row"
            onPress={() => {
              setShowModalMaxPrice(true);
            }}>
            <Text>{maxPrice ? maxPrice : 'Select'}</Text>
            <View style={globalStyles.gap2} />
            <IconFA name="chevron-right" size={20} />
          </Pressable>
        </HStack>
        <HStack alignItems="center" justifyContent="space-between" py={2}>
          <Text>Type</Text>

          {/* <Menu
            trigger={triggerProps => {
              return (
                <Pressable flexDirection="row" {...triggerProps}>
                  <Text>Select</Text>
                  <View style={globalStyles.gap2} />
                  <IconFA name="chevron-right" size={20} />
                </Pressable>
              );
            }}>
            <Menu.Item>Arial</Menu.Item>
            <Menu.Item>Nunito Sans</Menu.Item>
            <Menu.Item>Roboto</Menu.Item>
          </Menu> */}
          <Pressable flexDirection="row">
            <Text>Select</Text>
            <View style={globalStyles.gap2} />
            <IconFA name="chevron-right" size={20} />
          </Pressable>
        </HStack>
        <HStack alignItems="center" justifyContent="space-between" py={2}>
          <Text>Prepayment</Text>
          <Pressable flexDirection="row">
            <Switch
              onTrackColor="primary.600"
              isChecked={prepayment}
              onValueChange={setPrepayment}
            />
          </Pressable>
        </HStack>
        <HStack alignItems="center" justifyContent="space-between" py={2}>
          <Text>Available</Text>
          <Pressable flexDirection="row">
            <Switch
              onTrackColor="primary.600"
              isChecked={isAvailable}
              onValueChange={setIsAvailable}
            />
          </Pressable>
        </HStack>
      </VStack>
      <View mx={3} mb={3}>
        <Button color={COLOR_ACCENT} onPress={handleApplyFilter}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </Button>
      </View>

      <Modal isOpen={showModalSearch} onClose={() => setShowModalSearch(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Search</FormControl.Label>
              <Input onChangeText={setSearch} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <ButtonNB
              onPress={() => {
                setShowModalSearch(false);
              }}>
              <Text>Save</Text>
            </ButtonNB>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal
        isOpen={showModalMinPrice}
        onClose={() => setShowModalMinPrice(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Minimum Price</FormControl.Label>
              <Input onChangeText={setMinPrice} keyboardType="numeric" />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <ButtonNB
              onPress={() => {
                setShowModalMinPrice(false);
              }}>
              <Text>Save</Text>
            </ButtonNB>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal
        isOpen={showModalMaxPrice}
        onClose={() => setShowModalMaxPrice(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Maximum Price</FormControl.Label>
              <Input onChangeText={setMaxPrice} keyboardType="numeric" />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <ButtonNB
              onPress={() => {
                setShowModalMaxPrice(false);
              }}>
              <Text>Save</Text>
            </ButtonNB>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Picker
        style={{backgroundColor: 'white', width: 300, height: 215}}
        selectedValue="item4"
        pickerData={[
          'item1',
          'item2',
          'item3',
          'item4',
          'item5',
          'item6',
          'item7',
        ]}
        onValueChange={value => {}}
        itemSpace={30} // this only support in android
      />
    </VStack>
  );
};

export default Filter;

const styles = StyleSheet.create({
  applyButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

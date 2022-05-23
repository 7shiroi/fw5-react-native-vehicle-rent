import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyles from '../assets/style';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {
  COLOR_ACCENT,
  COLOR_GREY,
  COLOR_PRIMARY,
  HOME_NAV,
  PAYMENT_NAV,
  RESET_MESSAGE_STATE,
  TOGGLE_LOADING,
  VERIFY_USER_NAV,
} from '../helpers/utils';
import InputField from '../components/InputField';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {dateToString, stringToIdr} from '../helpers/converter';
import {
  Modal,
  ScrollView,
  Select,
  Button as ButtonNB,
  useToast,
  Spinner,
  Box,
  HStack,
  VStack,
  Image,
} from 'native-base';
import Button from '../components/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setTransactionData} from '../redux/actions/transaction';
import {
  deleteVehicleAction,
  getDetailVehicle,
  updateVehicleAction,
} from '../redux/actions/vehicles';
import QuantitySetter from '../components/QuantitySetter';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import LinearGradient from 'react-native-linear-gradient';
import IconAD from 'react-native-vector-icons/AntDesign';

const Order = () => {
  const route = useRoute();
  const {id} = route.params;
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const isLoading = useSelector(state => state.loading.isLoading);
  const messages = useSelector(state => state.messages);
  const {detailData} = useSelector(state => state.vehicles);
  const profile = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.token);
  const role = useSelector(state => state.auth.userData.id_role);
  const [qty, setQty] = useState(1);
  const [stock, setStock] = useState(1);
  const [rentDuration, setRentDuration] = useState('1');
  const [isAvailable, setIsAvailable] = useState('1');
  const [date, setDate] = useState(new Date());
  const [dateChanged, setDateChanged] = useState(false);
  const [showModalVerify, setShowModalVerify] = useState(false);
  const [showModalLoading, setShowModalLoading] = useState(true);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setDateChanged(true);
  };
  const handleShowDatePicker = e => {
    e.preventDefault();
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date',
    });
  };

  useEffect(() => {
    fetchDetailData(id);
    setIsAvailable(detailData.is_available);
    setStock(detailData.stock);
  }, []);
  const fetchDetailData = async id => {
    dispatch({type: TOGGLE_LOADING});
    await dispatch(getDetailVehicle(id));
    dispatch({type: TOGGLE_LOADING});
    setShowModalLoading(false);
  };

  const decrementButton = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const incrementButton = () => {
    if (qty < detailData.stock) {
      setQty(qty + 1);
    }
  };

  const handleBook = () => {
    if (profile.is_verified === 0) {
      setShowModalVerify(true);
    } else if (detailData.is_available === 0) {
      toast.show({description: 'Sorry! Vehicle is not available'});
    } else {
      const data = {startDate: date, rentDuration, quantity: qty};
      dispatch(setTransactionData(data));
      navigate.push(PAYMENT_NAV);
    }
  };

  const handleUpdateData = async () => {
    setShowModalUpdate(true);
    const data = [
      {
        name: 'stock',
        data: String(stock),
      },
      {name: 'is_available', data: String(isAvailable)},
    ];

    dispatch({type: TOGGLE_LOADING});
    await dispatch(updateVehicleAction(token, data, detailData.id));
    dispatch({type: TOGGLE_LOADING});
  };

  const handleDelete = async () => {
    dispatch({type: RESET_MESSAGE_STATE});
    setShowModalConfirmDelete(false);
    setShowModalDelete(true);

    dispatch({type: TOGGLE_LOADING});
    await dispatch(deleteVehicleAction(token, detailData.id));
    dispatch({type: TOGGLE_LOADING});
    navigate.goBack();
  };
  return (
    <ScrollView style={globalStyles.bgPrimary}>
      <VStack>
        <Box style={styles.container} position="relative">
          {detailData.image ? (
            <Image
              position="absolute"
              source={{uri: detailData.image}}
              alt="vehicle"
              w={Dimensions.get('window').width}
              h={Dimensions.get('window').height * 0.4}
            />
          ) : (
            <Box
              position="absolute"
              alignItems="center"
              justifyContent="center"
              backgroundColor={COLOR_GREY}
              w={Dimensions.get('window').width}
              h={Dimensions.get('window').height * 0.4}>
              <IconFA name="car" size={200} />
            </Box>
          )}
          <Box
            position="absolute"
            style={[
              styles.headerContainer,
              globalStyles.mx4,
              globalStyles.my5,
            ]}>
            <TouchableOpacity
              style={globalStyles.flex1}
              onPress={() => {
                navigate.goBack();
              }}>
              <IconFA name="chevron-left" size={20} />
            </TouchableOpacity>
            {role < 3 ? (
              <Pressable onPress={() => setShowModalConfirmDelete(true)}>
                <Box
                  w={35}
                  h={35}
                  borderRadius={20}
                  justifyContent="center"
                  alignItems="center"
                  backgroundColor={COLOR_ACCENT}>
                  <IconAD name="delete" size={18} />
                </Box>
              </Pressable>
            ) : (
              <>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#00ADB5', '#006778']}
                  style={[styles.rating, globalStyles.mx3]}>
                  <Text style={[styles.ratingText, globalStyles.textWhite]}>
                    4.5
                  </Text>
                </LinearGradient>
                <IconAD
                  name={true ? 'heart' : 'hearto'}
                  color={true ? 'red' : 'white'}
                  size={20}
                />
              </>
            )}
          </Box>
        </Box>
        <View style={[globalStyles.mx4, globalStyles.my3]}>
          <View style={[globalStyles.flexRow, styles.titleContainer]}>
            <Text
              style={[
                globalStyles.flex1,
                globalStyles.textWhite,
                styles.titleText,
              ]}>
              {detailData.name}
            </Text>
            <IconIonicons name="chatbubble-outline" size={25} color="#fff" />
          </View>
          <Text
            style={[
              styles.titleText,
              globalStyles.mb4,
              globalStyles.textWhite,
            ]}>
            Rp {stringToIdr(detailData.price)}/day
          </Text>
          <Text style={globalStyles.textWhite}>
            Max for {detailData.capacity}{' '}
            {detailData.capacity > 1 ? 'people' : 'person'}
          </Text>
          <Text style={globalStyles.textWhite}>
            {detailData.has_prepayent
              ? `Minimal Prepayment: ${stringToIdr(detailData.price * 0.1)} `
              : 'No Prepayment'}
          </Text>
          <Text
            style={[
              detailData.is_available
                ? styles.isAvailable
                : styles.isNotAvailable,
              globalStyles.mb5,
            ]}>
            {detailData.is_available ? 'Available' : 'Not Available'}
          </Text>
          <View
            style={[
              globalStyles.flexRow,
              styles.titleContainer,
              globalStyles.mb5,
            ]}>
            <IconIonicons name="location-outline" size={25} color="#fff" />
            <View style={globalStyles.gap3} />
            <Text style={globalStyles.textWhite}>{detailData.location}</Text>
          </View>
          {profile.id_role < 3 ? (
            <VStack space={5}>
              <View style={[globalStyles.flexRow, styles.quantityContainer]}>
                <Text style={globalStyles.textWhite}>Stock</Text>
                <QuantitySetter onChangeValue={setStock} />
              </View>
              <Box flexDirection="row" w="100%" justifyContent="space-around">
                <Pressable onPress={() => setIsAvailable(1)}>
                  <Box
                    width={170}
                    py={3}
                    justifyContent="center"
                    alignItems="center"
                    borderRadius={15}
                    backgroundColor={
                      isAvailable === 1 ? 'muted.900' : 'muted.300'
                    }>
                    <Text style={isAvailable === 1 && styles.activeText}>
                      Available
                    </Text>
                  </Box>
                </Pressable>
                <Pressable onPress={() => setIsAvailable(0)}>
                  <Box
                    width={170}
                    py={3}
                    justifyContent="center"
                    alignItems="center"
                    borderRadius={15}
                    backgroundColor={
                      isAvailable === 0 ? 'muted.900' : 'muted.300'
                    }>
                    <Text style={isAvailable === 0 && styles.activeText}>
                      Full Booked
                    </Text>
                  </Box>
                </Pressable>
              </Box>
              <ButtonNB w="100%" onPress={handleUpdateData}>
                Update Changes
              </ButtonNB>
            </VStack>
          ) : (
            <>
              <View
                style={[
                  globalStyles.flexRow,
                  styles.quantityContainer,
                  globalStyles.mb4,
                ]}>
                <Text style={globalStyles.textWhite}>Quantity</Text>
                <View style={globalStyles.flexRow}>
                  <TouchableOpacity onPress={decrementButton}>
                    <IconFA
                      name="minus-circle"
                      size={20}
                      color={COLOR_ACCENT}
                    />
                  </TouchableOpacity>
                  <View style={globalStyles.gap4} />
                  <Text style={[styles.quantityText, globalStyles.textWhite]}>
                    {qty}
                  </Text>
                  <View style={globalStyles.gap4} />
                  <TouchableOpacity onPress={incrementButton}>
                    <IconFA name="plus-circle" size={20} color={COLOR_ACCENT} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[globalStyles.flexRow, globalStyles.mb4]}>
                <InputField
                  style={globalStyles.flex1}
                  name="date"
                  placeholder="Search Date"
                  onFocus={handleShowDatePicker}
                  color="white"
                  value={dateChanged ? dateToString(date) : ''}
                />
                <View style={globalStyles.gap2} />
                <Select
                  selectedValue={rentDuration}
                  minWidth={75}
                  color="white"
                  onValueChange={nextValue => setRentDuration(nextValue)}
                  accessibilityLabel="Select rent duration">
                  <Select.Item label="1 Day" value="1" />
                  <Select.Item label="2 Day" value="2" />
                  <Select.Item label="3 Day" value="3" />
                  <Select.Item label="4 Day" value="4" />
                  <Select.Item label="5 Day" value="5" />
                  <Select.Item label="6 Day" value="6" />
                  <Select.Item label="7 Day" value="7" />
                </Select>
              </View>

              <Button
                onPress={handleBook}
                style={[globalStyles.py3]}
                color={COLOR_ACCENT}>
                <Text style={[styles.titleText, globalStyles.textWhite]}>
                  Book Now
                </Text>
              </Button>
            </>
          )}
        </View>

        <Modal
          isOpen={showModalVerify}
          onClose={() => setShowModalVerify(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.Body alignItems="center">
              <Text style={globalStyles.textWhite}>
                You have to verify your account first!
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <ButtonNB
                mr={5}
                onPress={() => {
                  setShowModalVerify(false);
                }}>
                <Text style={globalStyles.textWhite}>Cancel</Text>
              </ButtonNB>
              <ButtonNB
                onPress={() => {
                  navigate.push(VERIFY_USER_NAV);
                }}>
                <Text style={globalStyles.textWhite}>Go Verify</Text>
              </ButtonNB>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <Modal
          isOpen={showModalLoading}
          closeOnOverlayClick={false}
          onClose={() => setShowModalLoading(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.Body
              alignItems="center"
              justifyContent="center"
              flexDirection="row">
              <Spinner size="lg" />{' '}
              <Text style={globalStyles.textWhite}>Loading</Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        <Modal
          isOpen={showModalUpdate}
          closeOnOverlayClick={false}
          onClose={() => setShowModalUpdate(false)}>
          <Modal.Content maxWidth="400px">
            {isLoading && (
              <Modal.Body alignItems="center">
                <Text style={styles.titleText}>Please Wait</Text>
                <Spinner size="lg" />
              </Modal.Body>
            )}
            {!isLoading && messages.error && (
              <>
                <Modal.Body alignItems="center">
                  <Text style={styles.titleText}>Update data failed!</Text>
                  <Text style={globalStyles.textWhite}>
                    {messages.errorMsg}
                  </Text>
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    onPress={() => {
                      setShowModalUpdate(false);
                    }}>
                    <Text style={globalStyles.textWhite}>Close</Text>
                  </Button>
                </Modal.Footer>
              </>
            )}
            {!isLoading && !messages.error && (
              <>
                <Modal.Body alignItems="center">
                  <Text style={styles.titleText}>
                    Data successfully Updated!
                  </Text>
                </Modal.Body>

                <Modal.Footer>
                  <ButtonNB
                    onPress={() => {
                      setShowModalUpdate(false);
                    }}>
                    <Text style={globalStyles.textWhite}>Close</Text>
                  </ButtonNB>
                </Modal.Footer>
              </>
            )}
          </Modal.Content>
        </Modal>

        <Modal
          isOpen={showModalConfirmDelete}
          onClose={() => {
            setShowModalConfirmDelete(false);
          }}>
          <Modal.Content maxWidth="400px">
            <Modal.Body alignItems="center">
              <Text style={styles.titleText}>Are you sure?</Text>
            </Modal.Body>

            <Modal.Footer>
              <ButtonNB
                mr={5}
                onPress={() => {
                  setShowModalConfirmDelete(false);
                }}>
                <Text style={globalStyles.textWhite}>Close</Text>
              </ButtonNB>
              <ButtonNB colorScheme="danger" onPress={handleDelete}>
                <Text style={globalStyles.textWhite}>Delete</Text>
              </ButtonNB>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal
          isOpen={showModalDelete}
          closeOnOverlayClick={false}
          onClose={() => setShowModalDelete(false)}>
          <Modal.Content maxWidth="400px">
            {isLoading && (
              <Modal.Body alignItems="center">
                <Text style={styles.titleText}>Please Wait</Text>
                <Spinner size="lg" />
              </Modal.Body>
            )}
            {!isLoading && messages.error && (
              <>
                <Modal.Body alignItems="center">
                  <Text style={styles.titleText}>Delete data failed!</Text>
                  <Text style={globalStyles.textWhite}>
                    {messages.errorMsg}
                  </Text>
                </Modal.Body>

                <Modal.Footer>
                  <ButtonNB
                    onPress={() => {
                      setShowModalDelete(false);
                    }}>
                    <Text style={globalStyles.textWhite}>Close</Text>
                  </ButtonNB>
                </Modal.Footer>
              </>
            )}
            {!isLoading && !messages.error && (
              <>
                <Modal.Body alignItems="center">
                  <Text style={styles.titleText}>
                    Data successfully Deleted!
                  </Text>
                </Modal.Body>

                <Modal.Footer>
                  <ButtonNB
                    onPress={() => {
                      setShowModalDelete(false);
                    }}>
                    <Text style={globalStyles.textWhite}>Close</Text>
                  </ButtonNB>
                </Modal.Footer>
              </>
            )}
          </Modal.Content>
        </Modal>
      </VStack>
    </ScrollView>
  );
};

export default Order;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  isAvailable: {
    fontWeight: 'bold',
    color: 'green',
  },
  isNotAvailable: {
    fontWeight: 'bold',
    color: 'red',
  },
  quantityContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityText: {
    fontWeight: 'bold',
  },
  activeText: {
    fontWeight: 'bold',
    color: COLOR_ACCENT,
  },
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

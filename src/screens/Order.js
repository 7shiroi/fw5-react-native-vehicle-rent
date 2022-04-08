import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '../assets/style';
import OrderHeader from '../components/OrderHeader';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {COLOR_ACCENT, COLOR_PRIMARY, PAYMENT_NAV} from '../helpers/utils';
import InputField from '../components/InputField';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {dateToString, stringToIdr} from '../helpers/converter';
import {ScrollView, Select} from 'native-base';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setTransactionData} from '../redux/actions/transaction';

const Order = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {detailData} = useSelector(state => state.vehicles);
  const [qty, setQty] = useState(1);
  const [rentDuration, setRentDuration] = useState('1');
  const [date, setDate] = useState(new Date());
  const [dateChanged, setDateChanged] = useState(false);
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
    const data = {startDate: date, rentDuration, quantity: qty};
    dispatch(setTransactionData(data));
    navigate.push(PAYMENT_NAV);
  };

  return (
    <ScrollView>
      <OrderHeader />
      <View style={[globalStyles.mx4, globalStyles.my3]}>
        <View style={[globalStyles.flexRow, styles.titleContainer]}>
          <Text style={[globalStyles.flex1, styles.titleText]}>
            {detailData.name}
          </Text>
          <IconIonicons
            name="chatbubble-outline"
            size={25}
            color={COLOR_PRIMARY}
          />
        </View>
        <Text style={[styles.titleText, globalStyles.mb4]}>
          Rp {stringToIdr(detailData.price)}/day
        </Text>
        <Text>
          Max for {detailData.capacity}{' '}
          {detailData.capacity > 1 ? 'people' : 'person'}
        </Text>
        <Text>
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
          <IconIonicons name="location-outline" size={25} />
          <View style={globalStyles.gap3} />
          <Text>{detailData.location}</Text>
        </View>
        <View
          style={[
            globalStyles.flexRow,
            styles.quantityContainer,
            globalStyles.mb4,
          ]}>
          <Text>Quantity</Text>
          <View style={globalStyles.flexRow}>
            <TouchableOpacity onPress={decrementButton}>
              <IconFA name="minus-circle" size={20} color={COLOR_ACCENT} />
            </TouchableOpacity>
            <View style={globalStyles.gap4} />
            <Text style={styles.quantityText}>{qty}</Text>
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
            value={dateChanged ? dateToString(date) : ''}
          />
          <View style={globalStyles.gap2} />
          <Select
            selectedValue={rentDuration}
            minWidth={75}
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
          <Text style={styles.titleText}>Book Now</Text>
        </Button>
      </View>
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
});

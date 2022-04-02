import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '../assets/style';
import OrderHeader from '../components/OrderHeader';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {COLOR_ACCENT, COLOR_PRIMARY} from '../helpers/utils';
import InputField from '../components/InputField';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {dateToString} from '../helpers/converter';
import {Select} from 'native-base';
import Button from '../components/Button';

const Order = () => {
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
  return (
    <View>
      <OrderHeader />
      <View style={[globalStyles.mx4, globalStyles.my3]}>
        <View style={[globalStyles.flexRow, styles.titleContainer]}>
          <Text style={[globalStyles.flex1, styles.titleText]}>
            Vespa Matic
          </Text>
          <IconIonicons
            name="chatbubble-outline"
            size={25}
            color={COLOR_PRIMARY}
          />
        </View>
        <Text style={[styles.titleText, globalStyles.mb4]}>Rp 120.000/day</Text>
        <Text>Max for 2 person</Text>
        <Text>No Prepayment</Text>
        <Text style={[styles.isAvailable, globalStyles.mb5]}>Available</Text>
        <View
          style={[
            globalStyles.flexRow,
            styles.titleContainer,
            globalStyles.mb5,
          ]}>
          <IconIonicons name="location-outline" size={25} />
          <View style={globalStyles.gap3} />
          <Text>Jakarta</Text>
        </View>
        <View
          style={[
            globalStyles.flexRow,
            styles.quantityContainer,
            globalStyles.mb4,
          ]}>
          <Text>Quantity</Text>
          <View style={globalStyles.flexRow}>
            <TouchableOpacity
              onPress={() => {
                setQty(qty - 1);
              }}>
              <IconFA name="minus-circle" size={20} color={COLOR_ACCENT} />
            </TouchableOpacity>
            <View style={globalStyles.gap4} />
            <Text style={styles.quantityText}>{qty}</Text>
            <View style={globalStyles.gap4} />
            <TouchableOpacity
              onPress={() => {
                setQty(qty + 1);
              }}>
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
        <Button style={[globalStyles.py3]} color={COLOR_ACCENT}>
          <Text style={styles.titleText}>Book Now</Text>
        </Button>
      </View>
    </View>
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

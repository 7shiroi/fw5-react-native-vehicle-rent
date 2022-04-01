import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import globalStyle from '../assets/style';
import InputField from './InputField';
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import Button from './Button';
import {COLOR_ACCENT} from '../helpers/utils';
import {dateToString} from '../helpers/converter';

const HomeSearch = () => {
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
    <View style={globalStyle.bgPrimary}>
      <View style={globalStyle.my3}>
        <InputField name="location" placeholder="Search location" />
      </View>
      <View style={globalStyle.mb5}>
        <InputField
          name="date"
          placeholder="Search Date"
          onFocus={handleShowDatePicker}
          value={dateChanged ? dateToString(date) : ''}
        />
        {/* <RNDateTimePicker mode="date" value={new Date()} /> */}
      </View>
      <View>
        <Button color={COLOR_ACCENT}>
          <Text>Search Vehicle</Text>
        </Button>
      </View>
    </View>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({});

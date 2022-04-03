import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import globalStyle from '../assets/style';
import InputField from './InputField';
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import Button from './Button';
import {COLOR_ACCENT, SEARCH_NAV, TOGGLE_LOADING} from '../helpers/utils';
import {dateToString} from '../helpers/converter';
import {Select} from 'native-base';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const HomeSearch = () => {
  const [date, setDate] = useState(new Date());
  const [dateChanged, setDateChanged] = useState(false);
  const categories = useSelector(state => state.categories);
  const [category, setCategory] = useState(null);
  const navigate = useNavigation();

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
      <View style={[globalStyle.my3, globalStyle.flexRow]}>
        <InputField
          style={globalStyle.flex1}
          name="location"
          placeholder="Search location"
        />
        <Select
          placeholder="Category"
          selectedValue={category}
          minWidth={75}
          onValueChange={nextValue => setCategory(nextValue)}>
          {categories.categoriesData.map(obj => {
            return <Select.Item key={obj.id} value={obj.id} label={obj.name} />;
          })}
        </Select>
      </View>
      <View style={[globalStyle.mb5, globalStyle.flexRow]}>
        <InputField
          style={globalStyle.flex1}
          name="date"
          placeholder="Search Date"
          onFocus={handleShowDatePicker}
          value={dateChanged ? dateToString(date) : ''}
        />
        <Select
          placeholder="days"
          selectedValue={category}
          minWidth={75}
          onValueChange={nextValue => setCategory(nextValue)}>
          <Select.Item value="1" label="1 Day" />
          <Select.Item value="2" label="2 Days" />
          <Select.Item value="3" label="3 Days" />
          <Select.Item value="4" label="4 Days" />
          <Select.Item value="5" label="5 Days" />
        </Select>
      </View>
      <View>
        <Button
          color={COLOR_ACCENT}
          onPress={() => {
            navigate.push(SEARCH_NAV);
          }}>
          <Text>Search Vehicle</Text>
        </Button>
      </View>
    </View>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({});

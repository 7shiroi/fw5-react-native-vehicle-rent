import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BackHeader from '../components/BackHeader';
import {COLOR_ACCENT, PAYMENT_NAV} from '../helpers/utils';
import Stepper from '../components/Stepper';
import InputField from '../components/InputField';
import {Select} from 'native-base';
import globalStyles from '../assets/style';
import Button from '../components/Button';

const Payment = () => {
  const [paymentType, setPaymentType] = useState();
  return (
    <View style={globalStyles.flex1}>
      <BackHeader>{PAYMENT_NAV}</BackHeader>
      <View style={globalStyles.my3}>
        <Stepper count={3} currentlyActive={1} />
      </View>
      <View style={[globalStyles.mx4, globalStyles.flex1]}>
        <InputField
          style={globalStyles.my3}
          name="cardNumber"
          placeholder="ID card number"
        />
        <InputField
          style={globalStyles.mb3}
          name="firstName"
          placeholder="First Name"
        />
        <InputField
          style={globalStyles.mb3}
          name="lastName"
          placeholder="Last Name"
        />
        <InputField
          style={globalStyles.mb3}
          name="phoneNumber"
          placeholder="Mobile Phone (Must be active)"
          keyboardType="phone-pad"
        />
        <InputField
          style={globalStyles.mb3}
          name="email"
          placeholder="Email Address"
          keyboardType="email-address"
        />
        <InputField
          style={globalStyles.mb3}
          name="location"
          placeholder="Location (home, office, etc)"
        />
        <Select
          style={globalStyles.mb3}
          selectedValue={paymentType}
          minWidth={75}
          placeholder="Payment Type"
          onValueChange={nextValue => setPaymentType(nextValue)}
          accessibilityLabel="Select rent duration">
          <Select.Item label="Prepayment (no tax)" value="prepay" />
          <Select.Item label="Pay at the end (include tax)" value="later" />
          <Select.Item label="Partial Payment (include tax)" value="partial" />
        </Select>
      </View>
      <View style={[globalStyles.mx4, globalStyles.mb3]}>
        <Button color={COLOR_ACCENT} style={[globalStyles.py3]}>
          <Text style={styles.titleText}>See Order Details</Text>
        </Button>
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BackHeader from '../components/BackHeader';
import {
  BANK_ACCOUNT_NAME,
  BANK_ACCOUNT_NUMBER,
  BOTTOM_TAB_NAV,
  COLOR_ACCENT,
  COLOR_SECONDARY,
  HISTORY_NAV,
  PAYMENT_NAV,
  TOGGLE_LOADING,
} from '../helpers/utils';
import Stepper from '../components/Stepper';
import InputField from '../components/InputField';
import {
  Button as ButtonNB,
  Flex,
  HStack,
  Image,
  ScrollView,
  Select,
  useToast,
  VStack,
} from 'native-base';
import globalStyles from '../assets/style';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {
  addDays,
  dateToString,
  getFirstName,
  getLastName,
  stringToIdr,
} from '../helpers/converter';
import {
  saveTransaction,
  setTransactionData,
} from '../redux/actions/transaction';
import {DUMMY1} from '../assets/images';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {randomBookingCode, randomNumber} from '../helpers/generator';
import {useNavigation} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';

const Payment = () => {
  const [paymentType, setPaymentType] = useState(null);
  const vehicleData = useSelector(state => state.vehicles.detailData);
  const profile = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.token);
  const transaction = useSelector(state => state.transaction);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigation();
  PushNotification.createChannel({
    channelId: 'booking-confirm',
    channelName: 'Booking-confirm',
  });
  PushNotification.createChannel({
    channelId: 'payment-finish',
    channelName: 'payment-finish',
  });

  const handleSeeOrderDetails = () => {
    if (!paymentType) {
      toast.show({description: 'Select payment type!'});
    } else {
      PushNotification.localNotification({
        channelId: 'booking-confirm',
        title: 'Booking',
        message: 'Your booking has been confirmed!',
      });
      dispatch(setTransactionData({step: 2, paymentType}));
    }
  };
  const handleGetPaymentCode = () => {
    dispatch(
      setTransactionData({
        step: 3,
        paymentCode: randomNumber(8),
        bookingCode: randomBookingCode(8, 3),
      }),
    );
  };
  const handleFinishPayment = async () => {
    const data = {
      id_user: profile.id,
      id_vehicle: vehicleData.id,
      quantity: transaction.quantity,
      date_start: transaction.startDate,
      date_end: addDays(transaction.startDate, transaction.rentDuration - 1),
      prepayment: (vehicleData.price * 0.3).toFixed(2),
    };
    console.log(vehicleData);

    PushNotification.localNotification({
      channelId: 'finish-payment',
      title: 'Transaction finished!',
      message: 'Thank you for renting our vehicle!',
    });
    dispatch({type: TOGGLE_LOADING});
    await dispatch(saveTransaction(token, data));
    dispatch({type: TOGGLE_LOADING});
    navigate.replace(BOTTOM_TAB_NAV, {screen: HISTORY_NAV});
  };
  return (
    <>
      {transaction.step === 1 && (
        <View style={globalStyles.flex1}>
          <BackHeader>{PAYMENT_NAV}</BackHeader>
          <View style={globalStyles.my3}>
            <Stepper count={3} currentlyActive={transaction.step} weight={60} />
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
              defaultValue={getFirstName(profile.name)}
            />
            <InputField
              style={globalStyles.mb3}
              name="lastName"
              placeholder="Last Name"
              defaultValue={getLastName(profile.name)}
            />
            <InputField
              style={globalStyles.mb3}
              name="phoneNumber"
              placeholder="Mobile Phone (Must be active)"
              keyboardType="phone-pad"
              defaultValue={profile.phone_number}
            />
            <InputField
              style={globalStyles.mb3}
              name="email"
              placeholder="Email Address"
              keyboardType="email-address"
              defaultValue={profile.email}
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
              <Select.Item
                label="Prepayment (no tax)"
                value="Prepayment (no tax)"
              />
              <Select.Item
                label="Pay at the end (include tax)"
                value="Pay at the end (include tax)"
              />
              <Select.Item
                label="Partial Payment (include tax)"
                value="Partial Payment (include tax)"
              />
            </Select>
          </View>
          <View style={[globalStyles.mx4, globalStyles.mb3]}>
            <Button
              color={COLOR_ACCENT}
              style={[globalStyles.py3]}
              onPress={handleSeeOrderDetails}>
              <Text style={styles.titleText}>See Order Details</Text>
            </Button>
          </View>
        </View>
      )}
      {transaction.step === 2 && (
        <VStack flex={1}>
          <BackHeader>{PAYMENT_NAV}</BackHeader>
          <View style={globalStyles.my3}>
            <Stepper count={3} currentlyActive={transaction.step} weight={60} />
          </View>
          <View style={[styles.detailOrderImageContainer, globalStyles.mb3]}>
            <Image
              source={vehicleData.image ? {uri: vehicleData.image} : DUMMY1}
              style={styles.detailOrderImage}
              alt="Vehicle"
            />
          </View>
          <View style={[globalStyles.mx4, styles.detailContainer]}>
            <Text style={styles.detailText}>
              {transaction.quantity} {vehicleData.name}
            </Text>
            <Text style={styles.detailText}>{transaction.paymentType}</Text>
            <Text style={styles.detailText}>
              {transaction.rentDuration}{' '}
              {transaction.rentDuration > 1 ? 'days' : 'day'}
            </Text>
            <Text style={styles.detailText}>
              {dateToString(transaction.startDate)} to{' '}
              {dateToString(
                addDays(transaction.startDate, transaction.rentDuration - 1),
              )}
            </Text>
          </View>
          <Flex flex={1}>
            <View
              style={[
                globalStyles.mx4,
                globalStyles.flexRow,
                globalStyles.mt4,
                globalStyles.mb3,
                styles.priceContainer,
              ]}>
              <Text style={[styles.titleText]}>
                Rp{' '}
                {stringToIdr(
                  vehicleData.price *
                    transaction.rentDuration *
                    transaction.quantity,
                )}
              </Text>
              <View style={styles.info}>
                <IconFA name="info" size={24} />
              </View>
            </View>
          </Flex>
          <View style={[globalStyles.mx4, globalStyles.mb3]}>
            <Button color={COLOR_ACCENT} onPress={handleGetPaymentCode}>
              <Text style={styles.titleText}>Get Payment Code</Text>
            </Button>
          </View>
        </VStack>
      )}
      {transaction.step === 3 && (
        <ScrollView>
          <BackHeader>{PAYMENT_NAV}</BackHeader>
          <View style={globalStyles.my3}>
            <Stepper count={3} currentlyActive={transaction.step} weight={60} />
          </View>
          <VStack
            mt={3}
            mx={3}
            pb={5}
            space={3}
            alignItems="center"
            borderBottomWidth={2}
            borderBottomColor="black">
            <Text style={styles.subTitleText}>Payment Code :</Text>
            <Text style={styles.paymentCode}>{transaction.paymentCode}</Text>
            <Text>
              Insert your payment code while you transfer booking order
            </Text>
            <Text>Pay Before:</Text>
            <Text style={styles.timerText}>1:59:34</Text>
            <Text style={styles.subTitleText}>Bank Account Info :</Text>
            <Text style={styles.bankInfoText}>{BANK_ACCOUNT_NUMBER}</Text>
            <Text style={styles.subTitleText}>{BANK_ACCOUNT_NAME}</Text>
          </VStack>
          <VStack mt={5} mx={3} alignItems="center" space={3}>
            <View style={globalStyles.flexRow}>
              <Text style={styles.subTitleText}>Booking code: </Text>
              <Text style={styles.bookingCodeText}>
                {transaction.bookingCode}
              </Text>
            </View>
            <Text>Use booking code to pick up your vehicles</Text>
            <HStack space={3} width="100%" justifyContent="center">
              <ButtonNB
                backgroundColor={COLOR_ACCENT}
                // styles={[globalStyles.px4, globalStyles.py2]}
                px={4}
                py={2}>
                <Text>Copy Payment Code</Text>
              </ButtonNB>
              <ButtonNB
                backgroundColor={COLOR_ACCENT}
                // styles={[globalStyles.px4, globalStyles.py2]}
                px={4}
                py={2}>
                <Text>Copy Booking Code</Text>
              </ButtonNB>
            </HStack>
          </VStack>
          <VStack
            mt={5}
            mx={4}
            pb={3}
            borderBottomWidth={2}
            borderBottomColor="black">
            <Text style={styles.detailText}>Order Details:</Text>
            <Text style={styles.detailText}>
              {transaction.quantity} {vehicleData.name}
            </Text>
            <Text style={styles.detailText}>{transaction.paymentType}</Text>
            <Text style={styles.detailText}>
              {transaction.rentDuration}{' '}
              {transaction.rentDuration > 1 ? 'days' : 'day'}
            </Text>
            <Text style={styles.detailText}>
              {dateToString(transaction.startDate)} to{' '}
              {dateToString(
                addDays(transaction.startDate, transaction.rentDuration - 1),
              )}
            </Text>
          </VStack>
          <HStack width="100%" px={4} my={5} justifyContent="space-between">
            <Text style={[styles.titleText]}>
              Rp{' '}
              {stringToIdr(
                vehicleData.price *
                  transaction.rentDuration *
                  transaction.quantity,
              )}
            </Text>
            <View style={styles.info}>
              <IconFA name="info" size={24} />
            </View>
          </HStack>
          <View style={[globalStyles.mx4, globalStyles.mb3]}>
            <Button color={COLOR_ACCENT} onPress={handleFinishPayment}>
              <Text style={styles.titleText}>Finish Payment</Text>
            </Button>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Payment;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailOrderImageContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailOrderImage: {
    width: 338,
    height: 200,
  },
  detailText: {
    marginVertical: 5,
  },
  detailContainer: {
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  info: {
    backgroundColor: COLOR_SECONDARY,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceContainer: {
    justifyContent: 'space-between',
  },
  paymentCode: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9B0A0A',
  },
  bankInfoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bookingCodeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});

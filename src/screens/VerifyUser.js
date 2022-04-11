import {StyleSheet, Text, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import OTPTextView from 'react-native-otp-textinput';
import {Alert, Box, Button, VStack} from 'native-base';
import BackHeader from '../components/BackHeader';
import {
  COLOR_ACCENT,
  HOME_NAV,
  RESET_MESSAGE_STATE,
  TOGGLE_LOADING,
} from '../helpers/utils';
import {useDispatch, useSelector} from 'react-redux';
import {getProfileAction, verifyUserRequest} from '../redux/actions/auth';
import {FORGOTPASSWORDBG} from '../assets/images';
import globalStyle from '../assets/style';
import {useNavigation} from '@react-navigation/native';

const VerifyUser = () => {
  const [otp, setOtp] = useState('');
  const auth = useSelector(state => state.auth);
  const messages = useSelector(state => state.messages);
  const dispatch = useDispatch();
  const navigate = useNavigation();

  useEffect(() => {
    sendEmail();
  }, []);

  const sendEmail = async () => {
    dispatch({type: TOGGLE_LOADING});
    await dispatch(verifyUserRequest(auth.token, {}));
    dispatch({type: TOGGLE_LOADING});
  };

  const handleSubmit = async () => {
    dispatch({type: RESET_MESSAGE_STATE});
    dispatch({type: TOGGLE_LOADING});
    await dispatch(verifyUserRequest(auth.token, {code: otp}));
    await dispatch(getProfileAction(auth.token));
    dispatch({type: TOGGLE_LOADING});
  };
  return (
    <ImageBackground
      source={FORGOTPASSWORDBG}
      style={globalStyle.vh100}
      imageStyle={globalStyle.darkenedBg}>
      <BackHeader>Verify User</BackHeader>
      {auth.userData.is_verified === 0 && (
        <VStack mt={120} mx={5} alignItems="center">
          <Box mb={5}>
            <Text style={styles.headerText}>
              Check your email for your OTP code
            </Text>
          </Box>
          <Box mb={5}>
            <Text>Input OTP</Text>
          </Box>
          <OTPTextView
            handleTextChange={setOtp}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.roundedTextInput}
            inputCount={6}
          />
          {messages.error && messages.errorMsg.includes('Invalid code') && (
            <Alert mt={3} width="100%" colorScheme="danger">
              <Text>{messages.errorMsg}</Text>
            </Alert>
          )}
          <Button
            color={COLOR_ACCENT}
            width="100%"
            py={4}
            mt={5}
            onPress={handleSubmit}
            isDisabled={otp.length !== 6}>
            <Text style={styles.buttonText}>Submit</Text>
          </Button>
        </VStack>
      )}
      {auth.userData.is_verified === 1 && (
        <VStack mt={250} mx={5} alignItems="center">
          <Box mb={5}>
            <Text style={styles.headerText}>
              Your account has been verified!
            </Text>
          </Box>
        </VStack>
      )}
    </ImageBackground>
  );
};

export default VerifyUser;

const styles = StyleSheet.create({
  textInputContainer: {
    marginBottom: 5,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: '900',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

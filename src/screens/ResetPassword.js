import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import globalStyle from '../assets/style';
import {FORGOTPASSWORDBG} from '../assets/images';
import React, {useEffect, useState} from 'react';
import BackHeader from '../components/BackHeader';
import {Alert, Box, Button, Input, useToast, VStack} from 'native-base';
import {
  COLOR_ACCENT,
  LOGIN_NAV,
  RESET_MESSAGE_STATE,
  TOGGLE_LOADING,
} from '../helpers/utils';
import OTPTextView from 'react-native-otp-textinput';
import {comparePassword, passwordValidation} from '../helpers/validator';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPasswordRequest} from '../redux/actions/forgotPassword';
import {useNavigation} from '@react-navigation/native';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const forgotPassword = useSelector(state => state.forgotPassword);
  const messages = useSelector(state => state.messages);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigation();
  const handleResetPassword = async () => {
    dispatch({type: RESET_MESSAGE_STATE});
    if (!passwordValidation(password)) {
      toast.show({
        description:
          'Your password must include 1 uppercase, 1 lowercase, 1 number and at least 8 characters long',
      });
    } else if (!comparePassword(password, confirmPassword)) {
      toast.show({
        description: 'Confirm password is not same',
      });
    } else {
      dispatch({type: TOGGLE_LOADING});
      await dispatch(
        forgotPasswordRequest({
          email: forgotPassword.dataForgot.email,
          code: otp,
          password,
          confirmPassword,
        }),
      );
      dispatch({type: TOGGLE_LOADING});
    }
  };

  useEffect(() => {
    return () => {
      dispatch({type: RESET_MESSAGE_STATE});
    };
  }, []);
  return (
    <ImageBackground
      style={globalStyle.vh100}
      source={FORGOTPASSWORDBG}
      imageStyle={globalStyle.darkenedBg}>
      <BackHeader containerStyle={globalStyle.my5}>Back</BackHeader>
      {messages.msg.includes('Your password has been updated') && (
        <VStack>
          <Box mx={5} mt={100} mb={150} alignItems="center">
            <Text style={styles.headerText}>
              Your password has been updated!
            </Text>
          </Box>
          <Box mx={5}>
            <Button
              backgroundColor={COLOR_ACCENT}
              py={3}
              width="100%"
              isDisabled={otp.length !== 6}
              onPress={() => navigate.replace(LOGIN_NAV)}>
              <Text style={styles.buttonText}>Go to Login</Text>
            </Button>
          </Box>
        </VStack>
      )}
      {!messages.msg.includes('Your password has been updated') && (
        <VStack>
          <Box mx={5} mt={3} mb={35} alignItems="center">
            <Text style={styles.headerText}>
              Please check your email to see OTP Code we sent
            </Text>
          </Box>
          <VStack mx={10} alignItems="center" space={5}>
            <Text>Enter OTP Code</Text>
            <OTPTextView
              handleTextChange={setOtp}
              containerStyle={styles.textInputContainer}
              textInputStyle={styles.roundedTextInput}
              inputCount={6}
            />
            <Input
              placeholder="Enter your new password"
              width="100%"
              variant="outline"
              onChangeText={setPassword}
              secureTextEntry={true}
              backgroundColor="rgba(223, 223, 223, .5)"
            />
            <Input
              placeholder="Re-enter your new password"
              width="100%"
              variant="outline"
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
              backgroundColor="rgba(223, 223, 223, .5)"
            />
            {messages.error && messages.errorMsg.includes('Invalid code') && (
              <Alert>
                <Text>Invalid Code</Text>
              </Alert>
            )}
            <Button
              backgroundColor={COLOR_ACCENT}
              py={3}
              width="100%"
              isDisabled={otp.length !== 6}
              onPress={handleResetPassword}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </Button>
          </VStack>
        </VStack>
      )}
    </ImageBackground>
  );
};

export default ResetPassword;

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

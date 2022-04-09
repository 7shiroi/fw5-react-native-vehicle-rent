import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FORGOTPASSWORDBG} from '../assets/images';
import globalStyle from '../assets/style';
import {
  Alert,
  Box,
  Button,
  Input,
  ScrollView,
  useToast,
  VStack,
} from 'native-base';
import BackHeader from '../components/BackHeader';
import InputField from '../components/InputField';
import {
  COLOR_ACCENT,
  RESET_MESSAGE_STATE,
  RESET_PASSWORD_NAV,
  TOGGLE_LOADING,
} from '../helpers/utils';
import {useDispatch, useSelector} from 'react-redux';
import {emailValidation} from '../helpers/validator';
import {
  forgotPasswordRequest,
  setForgotPasswordData,
} from '../redux/actions/forgotPassword';
import {useNavigation} from '@react-navigation/native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const messages = useSelector(state => state.messages);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigation();

  useEffect(() => {
    return () => {
      dispatch({type: RESET_MESSAGE_STATE});
    };
  }, []);

  const handleSendCode = async () => {
    dispatch({type: RESET_MESSAGE_STATE});
    if (email.trim().length === 0) {
      toast.show({
        description: 'Email cannot be empty',
      });
    } else if (!emailValidation(email)) {
      toast.show({
        description: 'Invalid Email format!',
      });
    } else {
      dispatch({type: TOGGLE_LOADING});
      await dispatch(forgotPasswordRequest({email}));
      dispatch({type: TOGGLE_LOADING});
    }
  };
  const handleNextStep = () => {
    dispatch(setForgotPasswordData({email}));
    navigate.push(RESET_PASSWORD_NAV);
  };
  return (
    <ImageBackground
      style={globalStyle.vh100}
      source={FORGOTPASSWORDBG}
      imageStyle={globalStyle.darkenedBg}>
      <BackHeader containerStyle={globalStyle.my5}>Back</BackHeader>

      <VStack>
        {messages.msg.includes(
          'Your code for your password reset has been sent to your email!',
        ) && (
          <>
            <Box mx={5} mt={75} mb={120} alignItems="center">
              <Text style={styles.headerText}>
                {'We have sent an email for your reset password request!'}
              </Text>
            </Box>
            <Box mx={5}>
              <Button
                backgroundColor={COLOR_ACCENT}
                py={3}
                width="100%"
                onPress={handleNextStep}>
                <Text style={styles.buttonText}>Next Step</Text>
              </Button>
            </Box>
          </>
        )}
        {!messages.msg && (
          <>
            <Box mx={5} mt={75} mb={120} alignItems="center">
              <Text style={styles.headerText}>
                {'THAT’S OKAY, WE GOT YOUR BACK'}
              </Text>
            </Box>
            <VStack mx={10} alignItems="center" space={5}>
              <Text>Enter your email to get reset password code</Text>
              <Input
                placeholder="Enter your email"
                width="100%"
                variant="outline"
                onChangeText={setEmail}
                keyboardType="email-address"
                backgroundColor="rgba(223, 223, 223, .5)"
              />
              {messages.error && (
                <Alert width="100%" colorScheme="danger">
                  <Text>{messages.errorMsg}</Text>
                </Alert>
              )}
              <Button
                backgroundColor={COLOR_ACCENT}
                py={3}
                width="100%"
                onPress={handleSendCode}>
                <Text style={styles.buttonText}>Send Code</Text>
              </Button>
            </VStack>
          </>
        )}
      </VStack>
    </ImageBackground>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
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

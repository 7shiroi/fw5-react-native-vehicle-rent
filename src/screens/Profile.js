import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../components/Container';
import {PROFILE} from '../assets/images';
import globalStyle from '../assets/style';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';
import {
  AUTH_LOGOUT,
  COLOR_ACCENT,
  COLOR_GREY,
  RESET_MESSAGE_STATE,
  TOGGLE_LOADING,
  UPDATE_PROFILE_NAV,
  VERIFY_USER_NAV,
} from '../helpers/utils';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getProfileAction} from '../redux/actions/auth';
import {Box} from 'native-base';

const Profile = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    dispatch({type: TOGGLE_LOADING});
    await dispatch(getProfileAction(auth.token));
    dispatch({type: TOGGLE_LOADING});
  };

  const handleLogout = () => {
    dispatch({type: AUTH_LOGOUT});
    dispatch({type: RESET_MESSAGE_STATE});
  };

  return (
    <View style={globalStyle.flex1}>
      <View
        style={[
          globalStyle.flexRow,
          styles.headerContainer,
          globalStyle.bgPrimary,
          globalStyle.py3,
          globalStyle.px2,
        ]}>
        <Box
          w={60}
          h={60}
          borderRadius={30}
          justifyContent="center"
          alignItems="center"
          backgroundColor={'muted.200'}>
          {auth.userData.picture ? (
            <Image
              source={{uri: auth.userData.picture}}
              style={styles.circle}
            />
          ) : (
            <IconFA color="#fff" name="user" size={40} />
          )}
        </Box>
        <View style={globalStyle.gap4} />
        <Text style={[styles.userName, globalStyle.textWhite]}>
          {auth.userData.name}
        </Text>
      </View>
      <View style={[globalStyle.bgSecondary, globalStyle.flex1]}>
        <Button
          color="unset"
          buttonStyle={[styles.menuButton, globalStyle.px5, globalStyle.py4]}>
          <Text style={globalStyle.textWhite}>Your favorites</Text>
          <IconFA color="#fff" name="chevron-right" size={20} />
        </Button>
        <Button
          color="unset"
          buttonStyle={[styles.menuButton, globalStyle.px5, globalStyle.py4]}>
          <Text style={globalStyle.textWhite}>FAQ</Text>
          <IconFA color="#fff" name="chevron-right" size={20} />
        </Button>
        <Button
          color="unset"
          buttonStyle={[styles.menuButton, globalStyle.px5, globalStyle.py4]}>
          <Text style={globalStyle.textWhite}>Help</Text>
          <IconFA color="#fff" name="chevron-right" size={20} />
        </Button>
        <Button
          color="unset"
          buttonStyle={[styles.menuButton, globalStyle.px5, globalStyle.py4]}
          onPress={() => navigate.push(UPDATE_PROFILE_NAV)}>
          <Text style={globalStyle.textWhite}>Update Profile</Text>
          <IconFA color="#fff" name="chevron-right" size={20} />
        </Button>
        {auth.userData.is_verified === 0 && (
          <Button
            color="unset"
            buttonStyle={[styles.menuButton, globalStyle.px5, globalStyle.py4]}
            onPress={() => navigate.push(VERIFY_USER_NAV)}>
            <Text style={globalStyle.textWhite}>Verify Account</Text>
            <IconFA color="#fff" name="chevron-right" size={20} />
          </Button>
        )}
      </View>
      <View style={[globalStyle.bgSecondary, globalStyle.px4, globalStyle.py3]}>
        <Button color={COLOR_ACCENT} onPress={handleLogout}>
          <Text style={globalStyle.textWhite}>Logout</Text>
        </Button>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerContainer: {
    alignItems: 'center',
  },
  menuButton: {
    justifyContent: 'space-between',
  },
});

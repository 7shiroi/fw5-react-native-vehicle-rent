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
  RESET_MESSAGE_STATE,
  TOGGLE_LOADING,
  UPDATE_PROFILE_NAV,
  VERIFY_USER_NAV,
} from '../helpers/utils';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getProfileAction} from '../redux/actions/auth';

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
        <Image
          source={
            auth.userData.picture ? {uri: auth.userData.picture} : PROFILE
          }
          style={styles.circle}
        />
        <View style={globalStyle.gap4} />
        <Text style={styles.userName}>{auth.userData.name}</Text>
      </View>
      <View style={[globalStyle.bgSecondary, globalStyle.flex1]}>
        <Button
          color="unset"
          buttonStyle={[styles.menuButton, globalStyle.px5, globalStyle.py4]}>
          <Text>Your favorites</Text>
          <IconFA name="chevron-right" size={20} />
        </Button>
        <Button
          color="unset"
          buttonStyle={[styles.menuButton, globalStyle.px5, globalStyle.py4]}>
          <Text>FAQ</Text>
          <IconFA name="chevron-right" size={20} />
        </Button>
        <Button
          color="unset"
          buttonStyle={[styles.menuButton, globalStyle.px5, globalStyle.py4]}>
          <Text>Help</Text>
          <IconFA name="chevron-right" size={20} />
        </Button>
        <Button
          color="unset"
          buttonStyle={[styles.menuButton, globalStyle.px5, globalStyle.py4]}
          onPress={() => navigate.push(UPDATE_PROFILE_NAV)}>
          <Text>Update Profile</Text>
          <IconFA name="chevron-right" size={20} />
        </Button>
        {auth.userData.is_verified === 0 && (
          <Button
            color="unset"
            buttonStyle={[styles.menuButton, globalStyle.px5, globalStyle.py4]}
            onPress={() => navigate.push(VERIFY_USER_NAV)}>
            <Text>Verify Account</Text>
            <IconFA name="chevron-right" size={20} />
          </Button>
        )}
      </View>
      <View style={[globalStyle.bgSecondary, globalStyle.px4, globalStyle.py3]}>
        <Button color={COLOR_ACCENT} onPress={handleLogout}>
          <Text>Logout</Text>
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

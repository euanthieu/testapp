import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

import ZSafeAreaView from '../../components/common/ZSafeAreaView';
import strings from '../../i18n/strings';
import {styles} from '../../themes';
import ZText from '../../components/common/ZText';
import ZKeyBoardAvoidWrapper from '../../components/common/ZKeyBoardAvoidWrapper';
import {getHeight, moderateScale} from '../../common/constants';
import ZInput from '../../components/common/ZInput';
import {
  validateConfirmPassword,
  validatePassword,
} from '../../utils/validators';
import {StackNav} from '../../navigation/NavigationKeys';
import SuccessModal from '../../components/models/SuccessModal';
import ZButton from '../../components/common/ZButton';

const CreateNewPassword = ({navigation, route}) => {
  const title = route?.params?.title;
  const colors = useSelector(state => state.theme.theme);

  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    backgroundColor: colors.inputFocusColor,
    borderColor: colors.primary,
  };

  const BlurredIconStyle = colors.grayScale5;
  const FocusedIconStyle = colors.primary;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(true);
  const [passwordInputStyle, setPasswordInputStyle] = useState(BlurredStyle);
  const [confirmPasswordInputStyle, setConfirmPasswordInputStyle] = useState(BlurredStyle);
  const [passwordIcon, setPasswordIcon] = useState(BlurredIconStyle);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(BlurredIconStyle);
  const [modalVisible, setModalVisible] = useState(false);

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onFocusIcon = onHighlight => onHighlight(FocusedIconStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);
  const onBlurIcon = onUnHighlight => onUnHighlight(BlurredIconStyle);

  const PasswordIcon = ({iconColor}) => (
    <Ionicons name="lock-closed-outline" size={moderateScale(20)} color={iconColor} />
  );

  const onFocusPassword = () => {
    onFocusInput(setPasswordInputStyle);
    onFocusIcon(setPasswordIcon);
  };

  const onBlurPassword = () => {
    onBlurInput(setPasswordInputStyle);
    onBlurIcon(setPasswordIcon);
  };

  const RightPasswordEyeIcon = ({visible, onPress, iconColor}) => (
    <TouchableOpacity onPress={onPress} style={localStyles.eyeIconContainer}>
      <Ionicons
        name={visible ? 'eye-off-outline' : 'eye-outline'}
        size={moderateScale(20)}
        color={iconColor}
      />
    </TouchableOpacity>
  );

  const onPressPasswordEyeIcon = () => setIsPasswordVisible(!isPasswordVisible);
  
  const onPressConfirmPasswordEyeIcon = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const onChangedPassword = val => {
    const {msg} = validatePassword(val.trim());
    setPassword(val.trim());
    setPasswordError(msg);
  };

  const onChangedConfirmPassword = val => {
    const {msg} = validateConfirmPassword(val.trim(), password);
    setConfirmPassword(val.trim());
    setConfirmPasswordError(msg);
  };

  const onFocusConfirmPassword = () => {
    onFocusInput(setConfirmPasswordInputStyle);
    onFocusIcon(setConfirmPasswordIcon);
  };

  const onBlurConfirmPassword = () => {
    onBlurInput(setConfirmPasswordInputStyle);
    onBlurIcon(setConfirmPasswordIcon);
  };

  const onPressReset = () => {
    if (!!title) {
      navigation.goBack();
    }
    setModalVisible(true);
    navigation.navigate(StackNav.Login);
  };

  const onPressModalClose = () => setModalVisible(false);

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <ZSafeAreaView style={localStyles.root}>
      <ZKeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyles.mainContainer}>
          <TouchableOpacity 
            onPress={onPressBack}
            style={localStyles.backButton}>
            <Ionicons name="chevron-back" size={moderateScale(24)} color="#757474" />
          </TouchableOpacity>

          <ZText type={'b38'} align={'left'} color={colors.white} style={localStyles.title}>
            Rest Your{'\n'}Password
          </ZText>

          <ZInput
            placeHolder={'Password'}
            keyBoardType={'default'}
            _value={password}
            _errorText={passwordError}
            autoCapitalize={'none'}
            insideLeftIcon={() => <PasswordIcon iconColor={passwordIcon} />}
            toGetTextFieldValue={onChangedPassword}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              passwordInputStyle,
            ]}
            _isSecure={isPasswordVisible}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusPassword}
            onBlur={onBlurPassword}
            rightAccessory={() => (
              <RightPasswordEyeIcon
                visible={isPasswordVisible}
                onPress={onPressPasswordEyeIcon}
                iconColor={passwordIcon}
              />
            )}
          />

          <ZInput
            placeHolder={'Password'}
            keyBoardType={'default'}
            _value={confirmPassword}
            _errorText={confirmPasswordError}
            autoCapitalize={'none'}
            insideLeftIcon={() => (
              <PasswordIcon iconColor={confirmPasswordIcon} />
            )}
            toGetTextFieldValue={onChangedConfirmPassword}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              confirmPasswordInputStyle,
            ]}
            _isSecure={isConfirmPasswordVisible}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusConfirmPassword}
            onBlur={onBlurConfirmPassword}
            rightAccessory={() => (
              <RightPasswordEyeIcon
                visible={isConfirmPasswordVisible}
                onPress={onPressConfirmPasswordEyeIcon}
                iconColor={confirmPasswordIcon}
              />
            )}
          />

          <ZButton
            textType={'b16'}
            color={colors.white}
            title={'Reset'}
            onPress={onPressReset}
            containerStyle={localStyles.resetBtn}
            bgColor={colors.primary}
          />
        </View>
      </ZKeyBoardAvoidWrapper>
      <SuccessModal
        visible={modalVisible}
        onPressModalClose={onPressModalClose}
      />
    </ZSafeAreaView>
  );
};

export default CreateNewPassword;

const localStyles = StyleSheet.create({
  root: {
    backgroundColor: '#141718',
  },
  mainContainer: {
    ...styles.ph35,
    ...styles.pt45,
  },
  backButton: {
    width: moderateScale(45),
    height: moderateScale(45),
    borderRadius: moderateScale(22.5),
    backgroundColor: '#232627',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(30),
  },
  title: {
    marginBottom: moderateScale(50),
    lineHeight: moderateScale(47.5),
    letterSpacing: -1.52,
  },
  inputContainerStyle: {
    height: getHeight(65.5),
    borderRadius: moderateScale(12.84),
    borderWidth: 0,
    ...styles.ph15,
  },
  inputBoxStyle: {
    ...styles.ph15,
  },
  resetBtn: {
    width: '100%',
    height: getHeight(65.5),
    borderRadius: moderateScale(14),
    marginTop: moderateScale(30),
  },
});

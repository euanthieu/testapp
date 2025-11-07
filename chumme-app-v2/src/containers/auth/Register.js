import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import strings from '../../i18n/strings';
import {styles} from '../../themes';
import ZText from '../../components/common/ZText';
import {getHeight, moderateScale} from '../../common/constants';
import ZSafeAreaView from '../../components/common/ZSafeAreaView';
import {StackNav} from '../../navigation/NavigationKeys';
import ZInput from '../../components/common/ZInput';
import ZKeyBoardAvoidWrapper from '../../components/common/ZKeyBoardAvoidWrapper';
import {validateEmail, validatePassword} from '../../utils/validators';
import ZButton from '../../components/common/ZButton';

const Register = ({navigation}) => {
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

  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [fullNameIcon, setFullNameIcon] = React.useState(BlurredIconStyle);
  const [emailIcon, setEmailIcon] = React.useState(BlurredIconStyle);
  const [passwordIcon, setPasswordIcon] = React.useState(BlurredIconStyle);
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);
  const [fullNameInputStyle, setFullNameInputStyle] = React.useState(BlurredStyle);
  const [emailInputStyle, setEmailInputStyle] = React.useState(BlurredStyle);
  const [passwordInputStyle, setPasswordInputStyle] = React.useState(BlurredStyle);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onFocusIcon = onHighlight => onHighlight(FocusedIconStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);
  const onBlurIcon = onUnHighlight => onUnHighlight(BlurredIconStyle);

  useEffect(() => {
    if (
      fullName.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      !emailError &&
      !passwordError
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [fullName, email, password, emailError, passwordError]);

  const onChangedFullName = val => {
    setFullName(val);
  };

  const onChangedEmail = val => {
    const {msg} = validateEmail(val.trim());
    setEmail(val.trim());
    setEmailError(msg);
  };

  const onChangedPassword = val => {
    const {msg} = validatePassword(val.trim());
    setPassword(val.trim());
    setPasswordError(msg);
  };

  const onPressRegister = () => {
    navigation.navigate(StackNav.SelectInterest);
  };

  const onPressPasswordEyeIcon = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const FullNameIcon = () => {
    return <Ionicons name="person-outline" size={moderateScale(20)} color={fullNameIcon} />;
  };

  const onFocusFullName = () => {
    onFocusInput(setFullNameInputStyle);
    onFocusIcon(setFullNameIcon);
  };

  const onBlurFullName = () => {
    onBlurInput(setFullNameInputStyle);
    onBlurIcon(setFullNameIcon);
  };

  const EmailIcon = () => {
    return <Ionicons name="mail-outline" size={moderateScale(20)} color={emailIcon} />;
  };

  const onFocusEmail = () => {
    onFocusInput(setEmailInputStyle);
    onFocusIcon(setEmailIcon);
  };

  const onBlurEmail = () => {
    onBlurInput(setEmailInputStyle);
    onBlurIcon(setEmailIcon);
  };

  const PasswordIcon = () => (
    <Ionicons
      name="lock-closed-outline"
      size={moderateScale(20)}
      color={passwordIcon}
    />
  );

  const onFocusPassword = () => {
    onFocusInput(setPasswordInputStyle);
    onFocusIcon(setPasswordIcon);
  };

  const onBlurPassword = () => {
    onBlurInput(setPasswordInputStyle);
    onBlurIcon(setPasswordIcon);
  };

  const RightPasswordEyeIcon = () => (
    <TouchableOpacity
      onPress={onPressPasswordEyeIcon}
      style={localStyles.eyeIconContainer}>
      <Ionicons
        name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
        size={moderateScale(20)}
        color={passwordIcon}
      />
    </TouchableOpacity>
  );

  const onPressSignIn = () => {
    navigation.navigate(StackNav.Login);
  };

  const onPressGoogle = () => {
    console.log('Google signup');
  };

  const onPressFacebook = () => {
    console.log('Facebook signup');
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <ZSafeAreaView style={localStyles.root}>
      <ZKeyBoardAvoidWrapper>
        <View style={localStyles.mainContainer}>
          <TouchableOpacity 
            onPress={onPressBack}
            style={localStyles.backButton}>
            <Ionicons name="chevron-back" size={moderateScale(24)} color="#757474" />
          </TouchableOpacity>

          <ZText type={'b38'} align={'left'} color={colors.primary} style={localStyles.title}>
            Create your{'\n'}Account
          </ZText>

          <ZInput
            placeHolder={'Full Name'}
            keyBoardType={'default'}
            _value={fullName}
            autoCapitalize={'words'}
            insideLeftIcon={() => <FullNameIcon />}
            toGetTextFieldValue={onChangedFullName}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              fullNameInputStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusFullName}
            onBlur={onBlurFullName}
          />

          <ZInput
            placeHolder={'Enter Your Email'}
            keyBoardType={'email-address'}
            _value={email}
            _errorText={emailError}
            autoCapitalize={'none'}
            insideLeftIcon={() => <EmailIcon />}
            toGetTextFieldValue={onChangedEmail}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              emailInputStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusEmail}
            onBlur={onBlurEmail}
          />

          <ZInput
            placeHolder={'Password'}
            keyBoardType={'default'}
            _value={password}
            _errorText={passwordError}
            autoCapitalize={'none'}
            insideLeftIcon={() => <PasswordIcon />}
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
            rightAccessory={() => <RightPasswordEyeIcon />}
          />

          <ZButton
            title={'Register'}
            textType={'b16'}
            color={colors.white}
            containerStyle={[
              localStyles.registerBtnContainer,
              isSubmitDisabled && {opacity: 0.5},
            ]}
            bgColor={isSubmitDisabled ? colors.btnColor3 : colors.primary}
            onPress={onPressRegister}
            disabled={isSubmitDisabled}
          />

          <View style={localStyles.signInContainer}>
            <ZText type={'r16'} color={colors.grayScale6}>
              Already Have An Account?{' '}
            </ZText>
            <TouchableOpacity onPress={onPressSignIn}>
              <ZText type={'s16'} color={colors.white}>
                Sign In
              </ZText>
            </TouchableOpacity>
          </View>

          <View style={localStyles.divider} />

          <ZText 
            type={'m16'} 
            align={'center'} 
            color={colors.grayScale6}
            style={localStyles.continueText}>
            Continue With Accounts
          </ZText>

          <View style={localStyles.socialBtnContainer}>
            <TouchableOpacity
              style={localStyles.googleButton}
              onPress={onPressGoogle}>
              <ZText
                type={'s14'}
                color={'#D3427B'}
                style={localStyles.socialButtonText}>
                GOOGLE
              </ZText>
            </TouchableOpacity>

            <TouchableOpacity
              style={localStyles.facebookButton}
              onPress={onPressFacebook}>
              <ZText
                type={'s14'}
                color={'#4267B2'}
                style={localStyles.socialButtonText}>
                FACEBOOK
              </ZText>
            </TouchableOpacity>
          </View>
        </View>
      </ZKeyBoardAvoidWrapper>
    </ZSafeAreaView>
  );
};

export default Register;

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
  registerBtnContainer: {
    ...styles.center,
    width: '100%',
    ...styles.mt20,
    height: getHeight(65.5),
    borderRadius: moderateScale(14),
  },
  signInContainer: {
    ...styles.rowCenter,
    ...styles.mt15,
  },
  divider: {
    height: 0,
    opacity: 0.3,
    backgroundColor: '#C2C3CB',
    ...styles.mv25,
  },
  continueText: {
    marginBottom: moderateScale(15),
    letterSpacing: -0.16,
  },
  socialBtnContainer: {
    ...styles.rowCenter,
    gap: moderateScale(14),
  },
  googleButton: {
    flex: 1,
    height: moderateScale(57),
    backgroundColor: 'rgba(211, 66, 123, 0.25)',
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookButton: {
    flex: 1,
    height: moderateScale(57),
    backgroundColor: 'rgba(66, 103, 178, 0.25)',
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonText: {
    letterSpacing: moderateScale(2.55),
    textTransform: 'uppercase',
  },
});

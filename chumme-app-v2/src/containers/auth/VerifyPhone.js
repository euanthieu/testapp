import {StyleSheet, View, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import ZText from '../../components/common/ZText';
import {styles} from '../../themes';
import {getHeight, moderateScale} from '../../common/constants';
import ZSafeAreaView from '../../components/common/ZSafeAreaView';
import {StackNav} from '../../navigation/NavigationKeys';
import ZInput from '../../components/common/ZInput';
import ZKeyBoardAvoidWrapper from '../../components/common/ZKeyBoardAvoidWrapper';
import ZButton from '../../components/common/ZButton';

const VerifyPhone = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState('');

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

  const [phoneIcon, setPhoneIcon] = useState(BlurredIconStyle);
  const [phoneInputStyle, setPhoneInputStyle] = useState(BlurredStyle);

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onFocusIcon = onHighlight => onHighlight(FocusedIconStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);
  const onBlurIcon = onUnHighlight => onUnHighlight(BlurredIconStyle);

  const PhoneIcon = () => (
    <Ionicons name="call-outline" size={moderateScale(18)} color={phoneIcon} />
  );

  const onFocusPhone = () => {
    onFocusInput(setPhoneInputStyle);
    onFocusIcon(setPhoneIcon);
  };

  const onBlurPhone = () => {
    onBlurInput(setPhoneInputStyle);
    onBlurIcon(setPhoneIcon);
  };

  const onChangedPhone = val => {
    setPhoneNumber(val);
  };

  const onPressVerification = () => {
    setShowModal(true);
  };

  const onPressLater = () => {
    navigation.navigate(StackNav.SelectInterest);
  };

  const onPressVerify = () => {
    setShowModal(false);
    navigation.navigate(StackNav.SelectInterest);
  };

  const onPressSendAgain = () => {
    setOtp('');
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const onOtpChange = code => setOtp(code);

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
            Enter Your Phone{'\n'}Number
          </ZText>

          <ZInput
            placeHolder={'Phone Number'}
            keyBoardType={'phone-pad'}
            _value={phoneNumber}
            autoCapitalize={'none'}
            insideLeftIcon={() => <PhoneIcon />}
            toGetTextFieldValue={onChangedPhone}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              phoneInputStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusPhone}
            onBlur={onBlurPhone}
          />

          <ZButton
            title={'Verification'}
            textType={'b16'}
            color={colors.white}
            containerStyle={localStyles.verificationBtn}
            bgColor={colors.darkButton}
            onPress={onPressVerification}
          />

          <ZButton
            title={'Later'}
            textType={'b16'}
            color={colors.lightGray}
            containerStyle={localStyles.laterBtn}
            bgColor={colors.inputBg}
            onPress={onPressLater}
          />
        </View>
      </ZKeyBoardAvoidWrapper>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}>
        <View style={localStyles.modalOverlay}>
          <View style={localStyles.modalContent}>
            <ZText type={'b22'} align={'center'} color={colors.white} style={localStyles.modalTitle}>
              Verify Phone Number
            </ZText>

            <ZText type={'r14'} align={'center'} color={colors.grayScale6} style={localStyles.modalDesc}>
              We Have Sent Code To Your Phone Number
            </ZText>

            <ZText type={'s15'} align={'center'} color={colors.grayScale6} style={localStyles.phoneDisplay}>
              +00 000000 0000
            </ZText>

            <OTPInputView
              pinCount={4}
              code={otp}
              onCodeChanged={onOtpChange}
              autoFocusOnLoad={false}
              codeInputFieldStyle={[
                localStyles.otpInputStyle,
                {
                  color: colors.textColor,
                  backgroundColor: 'transparent',
                  borderColor: colors.borderColor,
                },
              ]}
              codeInputHighlightStyle={{
                borderColor: colors.primary,
              }}
              style={localStyles.otpContainerStyle}
            />

            <ZButton
              title={'Verify'}
              textType={'b16'}
              color={colors.white}
              containerStyle={localStyles.modalVerifyBtn}
              bgColor={colors.darkButton}
              onPress={onPressVerify}
            />

            <ZButton
              title={'Send Again'}
              textType={'b16'}
              color={colors.lightGray}
              containerStyle={localStyles.modalSendAgainBtn}
              bgColor={colors.inputBg}
              onPress={onPressSendAgain}
            />
          </View>
        </View>
      </Modal>
    </ZSafeAreaView>
  );
};

export default VerifyPhone;

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
    height: getHeight(66),
    borderRadius: moderateScale(12.84),
    borderWidth: 0,
    ...styles.ph15,
    marginBottom: moderateScale(30),
  },
  inputBoxStyle: {
    ...styles.ph15,
  },
  verificationBtn: {
    ...styles.center,
    width: '100%',
    height: getHeight(66),
    borderRadius: moderateScale(14),
    marginBottom: moderateScale(14),
  },
  laterBtn: {
    ...styles.center,
    width: '100%',
    height: getHeight(66),
    borderRadius: moderateScale(14),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(35, 38, 39, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(32),
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#141718',
    borderRadius: moderateScale(27),
    padding: moderateScale(26),
    paddingVertical: moderateScale(40),
  },
  modalTitle: {
    marginBottom: moderateScale(12),
    lineHeight: moderateScale(27.5),
    letterSpacing: -0.88,
  },
  modalDesc: {
    marginBottom: moderateScale(15),
  },
  phoneDisplay: {
    marginBottom: moderateScale(30),
    letterSpacing: -0.3,
  },
  otpContainerStyle: {
    height: moderateScale(60),
    marginBottom: moderateScale(45),
  },
  otpInputStyle: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(13),
    borderWidth: moderateScale(1.5),
    fontSize: moderateScale(18),
  },
  modalVerifyBtn: {
    width: '100%',
    height: getHeight(66),
    borderRadius: moderateScale(14),
    marginBottom: moderateScale(12),
  },
  modalSendAgainBtn: {
    width: '100%',
    height: getHeight(66),
    borderRadius: moderateScale(14),
  },
});

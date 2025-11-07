import {StyleSheet, View, TouchableOpacity, Modal} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ZSafeAreaView from '../../components/common/ZSafeAreaView';
import strings from '../../i18n/strings';
import ZText from '../../components/common/ZText';
import ZKeyBoardAvoidWrapper from '../../components/common/ZKeyBoardAvoidWrapper';
import {styles} from '../../themes';
import {getHeight, moderateScale} from '../../common/constants';
import {StackNav} from '../../navigation/NavigationKeys';
import ZButton from '../../components/common/ZButton';

const ForgotPasswordOtp = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);
  const [otp, setOtp] = useState('');
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const onOtpChange = code => setOtp(code);

  const onPressVerify = () => {
    navigation.navigate(StackNav.CreateNewPassword);
  };

  const onPressSendAgain = () => {
    setOtp('');
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <ZSafeAreaView style={localStyles.root}>
      <View style={localStyles.mainContainer}>
        <TouchableOpacity 
          onPress={onPressBack}
          style={localStyles.backButton}>
          <Ionicons name="chevron-back" size={moderateScale(24)} color="#757474" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          setShowModal(false);
          navigation.goBack();
        }}>
        <View style={localStyles.modalOverlay}>
          <View style={localStyles.modalContent}>
            <ZText type={'b22'} align={'center'} color={colors.white} style={localStyles.modalTitle}>
              Verify Email
            </ZText>

            <ZText type={'r14'} align={'center'} color={colors.grayScale6} style={localStyles.modalDesc}>
              We Have Sent Code To Your Phone Number
            </ZText>

            <ZText type={'s15'} align={'center'} color={colors.grayScale6} style={localStyles.emailDisplay}>
              Joseph---Mail.Com
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

export default ForgotPasswordOtp;

const localStyles = StyleSheet.create({
  root: {
    backgroundColor: '#141718',
    flex: 1,
  },
  mainContainer: {
    ...styles.ph35,
    ...styles.pt45,
  },
  backButton: {
    width: moderateScale(45),
    height: moderateScale(45),
    borderRadius: moderateScale(22.5),
    backgroundColor: '#141718',
    alignItems: 'center',
    justifyContent: 'center',
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
    lineHeight: moderateScale(21),
  },
  emailDisplay: {
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

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ZSafeAreaView from '../../components/common/ZSafeAreaView';
import strings from '../../i18n/strings';
import {styles} from '../../themes';
import ZText from '../../components/common/ZText';
import {Email_Icon, Sms_Icon} from '../../assets/svgs';
import {getHeight, moderateScale} from '../../common/constants';
import {StackNav} from '../../navigation/NavigationKeys';
import ZButton from '../../components/common/ZButton';
import ZKeyBoardAvoidWrapper from '../../components/common/ZKeyBoardAvoidWrapper';

const ForgotPassword = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);
  const [isSelected, setIsSelected] = useState('email');

  const onPressEmail = () => {
    setIsSelected('email');
  };

  const onPressPhone = () => {
    setIsSelected('phone');
  };

  const onPressNext = () => {
    navigation.navigate(StackNav.ForgotPasswordOtp);
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
            Forget Password
          </ZText>

          <ZText type={'r14'} align={'left'} color={colors.grayScale6} style={localStyles.description}>
            Select which contact details should we use to reset your password
          </ZText>

          <TouchableOpacity
            onPress={onPressEmail}
            activeOpacity={0.8}
            style={[
              localStyles.methodCard,
              {
                borderColor: isSelected === 'email' ? colors.primary : colors.bColor,
                backgroundColor: colors.inputBg,
              },
            ]}>
            <View style={localStyles.iconContainer}>
              <View style={[localStyles.iconCircle, {backgroundColor: colors.primary}]}>
                <Ionicons name="mail-outline" size={moderateScale(24)} color={colors.white} />
              </View>
            </View>
            <View style={localStyles.methodTextContainer}>
              <ZText type={'s18'} color={colors.textColor}>
                Email
              </ZText>
              <ZText type={'r15'} color={colors.grayScale6} style={localStyles.methodDesc}>
                Code Send to your email
              </ZText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPressPhone}
            activeOpacity={0.8}
            style={[
              localStyles.methodCard,
              {
                borderColor: isSelected === 'phone' ? colors.primary : colors.bColor,
                backgroundColor: colors.inputBg,
              },
            ]}>
            <View style={localStyles.iconContainer}>
              <View style={[localStyles.iconCircle, {backgroundColor: colors.primary}]}>
                <Ionicons name="call-outline" size={moderateScale(24)} color={colors.white} />
              </View>
            </View>
            <View style={localStyles.methodTextContainer}>
              <ZText type={'s18'} color={colors.textColor}>
                Phone
              </ZText>
              <ZText type={'r15'} color={colors.grayScale6} style={localStyles.methodDesc}>
                Code Send to your email
              </ZText>
            </View>
          </TouchableOpacity>

          <ZButton
            textType={'b16'}
            color={colors.white}
            title={'Next'}
            onPress={onPressNext}
            containerStyle={localStyles.nextBtn}
            bgColor={colors.darkButton}
          />
        </View>
      </ZKeyBoardAvoidWrapper>
    </ZSafeAreaView>
  );
};

export default ForgotPassword;

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
    marginBottom: moderateScale(12),
    lineHeight: moderateScale(47.5),
    letterSpacing: -1.52,
  },
  description: {
    marginBottom: moderateScale(43),
    lineHeight: moderateScale(21),
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(17),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    marginBottom: moderateScale(25),
  },
  iconContainer: {
    marginRight: moderateScale(19),
  },
  iconCircle: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodTextContainer: {
    flex: 1,
  },
  methodDesc: {
    marginTop: moderateScale(4),
  },
  nextBtn: {
    width: '100%',
    height: getHeight(66),
    borderRadius: moderateScale(14),
    marginTop: moderateScale(45),
  },
});

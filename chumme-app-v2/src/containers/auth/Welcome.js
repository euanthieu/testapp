import { StyleSheet, View } from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import ZText from '../../components/common/ZText';
import ZSafeAreaView from '../../components/common/ZSafeAreaView';
import { styles } from '../../themes';
import { getHeight, moderateScale } from '../../common/constants';
import {StackNav} from '../../navigation/NavigationKeys';
import ZButton from '../../components/common/ZButton';
import {App_Logo, Text_Logo} from '../../assets/svgs';

const LoginSuccess = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);

  const onPressGetStarted = () => {
    navigation.navigate(StackNav.SelectInterest);
  };
  return (
    <ZSafeAreaView style={localStyles.root}>
      <View style={localStyles.container}>
        <View style={localStyles.logoContainer}>
          <App_Logo width={moderateScale(110)} height={moderateScale(115)} />
        </View>

        <View style={localStyles.welcomeTextContainer}>
          <ZText type={'m36'} align={'center'} color={'#FFFFFF'}>
            Welcome to
          </ZText>
          <View style={localStyles.textLogoBox}>
            <Text_Logo width={'80%'} height={'80%'} />
          </View>
        </View>

        <ZText
          type={'r18'}
          align={'center'}
          color={'#616161'}
          style={localStyles.descriptionText}>
          Start chatting with Chumme now.{'\n'}You can ask me anything.
        </ZText>

        <View style={localStyles.buttonContainer}>
          <ZButton
            title={'Get Started'}
            textType={'b15'}
            align={'center'}
            color={'#FFFFFF'}
            bgColor={'#D3427B'}
            containerStyle={localStyles.getStartedButton}
            onPress={onPressGetStarted}
          />
        </View>
      </View>
    </ZSafeAreaView>
  );
}

export default LoginSuccess;

const localStyles = StyleSheet.create({
  root: {
    backgroundColor: '#141718',
    ...styles.flex,
  },
  container: {
    ...styles.flex,
    backgroundColor: '#141718',
    paddingHorizontal: moderateScale(43),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeTextContainer: {
    marginTop: getHeight(24),
    marginBottom: getHeight(14),
    alignItems: 'center',
  },
  textLogoBox: {
    width: moderateScale(280),
    height: moderateScale(70),
    marginTop: moderateScale(1),
    alignItems: 'center',
  },
  descriptionText: {
    lineHeight: moderateScale(28.8),
    letterSpacing: 0.2,
  },
  buttonContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: getHeight(63),
    width: '100%',
    paddingHorizontal: moderateScale(43),
    left: 40,
    right: 0,
  },
  getStartedButton: {
    height: moderateScale(63),
    borderRadius: moderateScale(16),
    width: '100%',
  },
});
//App colors
const LightColor = {
  light: 'light',
  backgroundColor: '#F3F5F6',
  textColor: '#323142',
  textRevertColor: '#FFFFFF',
  btnColor3: '#EEEEEE',
  inputBg: '#FFFFFF',
  dark3: '#FFEDF0',
  iconColor: '#141416',
  bColor: '#141416',
  btnColor1: '#FFFFFF',
};

const DarkColor = {
  dark: 'dark',
  backgroundColor: '#141718',
  textColor: '#FFFFFF',
  textRevertColor: '#212121',
  btnColor3: '#232627',
  inputBg: '#232627',
  dark3: '#35383F',
  iconColor: '#C2C3CB',
  bColor: '#35383F',
  btnColor1: '#232627',
};

// Common colors
export const commonColor = {
  white: '#FFFFFF',
  black: '#000000',
  primary: '#D3427B',
  grayScale1: '#F5F5F5',
  grayScale3: '#E0E0E0',
  grayScale4: '#BDBDBD',
  grayScale5: '#C2C3CB',
  grayScale6: '#ACADB9',
  grayScale7: '#616161',
  primaryTransparent: 'rgba(211, 66, 123, 0.25)',
  facebookTransparent: 'rgba(66, 103, 178, 0.25)',
  placeHolderColor: '#C2C3CB',
  borderColor: '#C2C3CB',
  inputFocusColor: 'rgba(211, 66, 123, 0.1)',
  tranparent: '#00000000',
  darkBg: '#141718',
  redColor: '#F75555',
  lightRed: '#FF5C74',
  lightGray: '#B1B1B1',
  orange: '#FB9400',
  blue: '#4267B2',
  gray: '#35383F99',
  yellow: '#FFD300',
  darkColor: '#1F222A',
  teal: '#C8EEEA',
  darkButton: '#1B1E20',
};

export const colors = {
  light: {
    ...LightColor,
    ...commonColor,
  },

  dark: {
    ...DarkColor,
    ...commonColor,
  },
};

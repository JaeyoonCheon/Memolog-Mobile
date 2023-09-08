interface ColorTheme {
  [k: string]: string;
}

interface FontTheme {
  [k: string]: string;
}

interface SpacingTheme {
  [k: string]: number;
}

export const COLOR: ColorTheme = {
  white: '#FFFFFF',
  black: '#000000',

  primary0: '#000000',
  primary10: '#001F24',
  primary20: '#00363C',
  primary30: '#004F57',
  primary40: '#006973',
  primary50: '#008491',
  primary60: '#00A0B0',
  primary70: '#22BCCE',
  primary80: '#4FD8EA',
  primary90: '#95F1FF',
  primary95: '#CFF8FF',
  primary99: '#F6FEFF',
  primary100: '#FFFFFF',

  secondary0: '#000000',
  secondary10: '#051F23',
  secondary20: '#1C3438',
  secondary30: '#334B4F',
  secondary40: '#4A6267',
  secondary50: '#637B80',
  secondary60: '#7C9599',
  secondary70: '#96B0B4',
  secondary80: '#B1CBD0',
  secondary90: '#CDE7EC',
  secondary95: '#DBF6FA',
  secondary99: '#F6FEFF',
  secondary100: '#FFFFFF',

  tertiary0: '#000000',
  tertiary10: '#0E1B37',
  tertiary20: '#24304D',
  tertiary30: '#3A4664',
  tertiary40: '#525E7D',
  tertiary50: '#6B7697',
  tertiary60: '#8490B2',
  tertiary70: '#9FABCE',
  tertiary80: '#BAC6EA',
  tertiary90: '#D9E2FF',
  tertiary95: '#EEF0FF',
  tertiary99: '#FEFBFF',
  tertiary100: '#FFFFFF',

  error0: '#000000',
  error10: '#410002',
  error20: '#690005',
  error30: '#93000A',
  error40: '#BA1A1A',
  error50: '#DE3730',
  error60: '#FF5449',
  error70: '#FF897D',
  error80: '#FFB4AB',
  error90: '#FFDAD6',
  error95: '#FFEDEA',
  error99: '#FFFBFF',
  error100: '#FFFFFF',

  neutral0: '#000000',
  neutral10: '#191C1D',
  neutral20: '#2E3132',
  neutral30: '#444748',
  neutral40: '#5C5F5F',
  neutral50: '#747878',
  neutral60: '#8E9192',
  neutral70: '#A9ACAC',
  neutral80: '#C4C7C7',
  neutral90: '#E1E3E3',
  neutral95: '#EFF1F1',
  neutral99: '#FAFDFD',
  neutral100: '#FFFFFF',
};

export const FONT: FontTheme = {
  display_large: '57px',
  display_medium: '45px',
  display_small: '36px',
  headline_large: '32px',
  headline_medium: '28px',
  headline_small: '24px',
  title_large: '22px',
  title_medium: '16px',
  title_small: '14px',
  body_large: '16px',
  body_medium: '14px',
  body_small: '12px',
  label_large: '14px',
  label_medium: '12px',
  label_small: '11px',
};

export const SPACING: SpacingTheme = {
  large: 16,
  medium: 12,
  small: 4,
};

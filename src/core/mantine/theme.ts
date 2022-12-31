import { MantineThemeOverride } from '@mantine/core';
import { Poppins, Ubuntu_Mono } from '@next/font/google';
import {
  defaultKbdProps,
  defaultTextInputProps,
  defaultTooltipProps,
} from './defaultProps';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'auto',
});

const ubuntuMono = Ubuntu_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'auto',
});

const theme: MantineThemeOverride = {
  colors: {
    'lava-pink': [
      '#FAE7E9',
      '#F8BDC5',
      '#FF8E9E',
      '#F07687',
      '#DD6476',
      '#C95868',
      '#B54F5E',
      '#9C4F5A',
      '#854E56',
    ],
  },
  primaryColor: 'lava-pink',
  primaryShade: 3,
  defaultRadius: 'sm',
  fontFamily: poppins.style.fontFamily,
  fontFamilyMonospace: ubuntuMono.style.fontFamily,
  headings: {
    fontFamily: poppins.style.fontFamily,
  },
  components: {
    Kbd: defaultKbdProps,
    TextInput: defaultTextInputProps,
    Tooltip: defaultTooltipProps,
  },
};

export default theme;

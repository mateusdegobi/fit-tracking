import { ColorSchemeName } from 'react-native';
import { DefaultTheme } from 'styled-components/native';

export type themeType = 'light' | 'dark';

export interface IAppearanceProps {
  currentTheme: themeType;
  theme: DefaultTheme;
}

export interface IColorSchemeProps {
  colorScheme: ColorSchemeName;
}

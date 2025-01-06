import 'styled-components/native';

declare module 'styled-components/native' {
  export interface IDefaultTheme {
    colors: {
      primary: string;
      error: string;
      background: string;
    };
  }
}

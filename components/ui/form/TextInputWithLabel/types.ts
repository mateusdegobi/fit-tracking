import { TextInputProps } from 'react-native';

export interface TextInputWithLabelProps extends TextInputProps {
  label?: string;
  isError?: boolean;
  messageError?: string;
  isActive?: boolean;
}

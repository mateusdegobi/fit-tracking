import { PressableProps } from 'react-native';
import React from 'react';
import { Container } from './styles';
import { Text } from '../Text/Text';
import { useTheme } from 'styled-components/native';

export type ButtonProps = {
  title: string;
  type?: 'primary' | 'secondary';
} & PressableProps;

export default function Button({
  title,
  disabled = false,
  type = 'primary',
  ...rest
}: ButtonProps) {
  const theme = useTheme();

  return (
    <Container type={type} disabled={disabled} {...rest}>
      <Text type="h4" color={type === 'primary' ? '#eee' : theme.primary}>
        {title}
      </Text>
    </Container>
  );
}

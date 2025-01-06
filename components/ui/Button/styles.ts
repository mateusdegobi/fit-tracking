import styled from 'styled-components/native';
import { ButtonProps } from './Button';

type ContainerProps = {
  type: ButtonProps['type'];
};
export const Container = styled.TouchableOpacity<ContainerProps>`
  background-color: ${({ theme, type }) =>
    type === 'primary' ? theme.primary : 'transparent'};
  padding: 8px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

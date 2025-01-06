import styled, { css } from 'styled-components/native';

export const Content = styled.View`
  margin-bottom: 15px;
`;

export interface ILabelStyleProps {
  isActive?: boolean;
}
export const Label = styled.Text<ILabelStyleProps>`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  font-weight: 500;
  padding: 5px 0px;

  ${({ isActive, theme }) => {
    if (isActive) {
      return css`
        font-weight: 700;
        color: ${theme.main};
      `;
    }
  }}
`;
type TypeError = {
  isError?: boolean;
  isActive?: boolean;
};
export const TextInputComp = styled.TextInput<TypeError>`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.backgroundContrast};
  padding: 8px 14px;
  color: ${({ theme }) => theme.textinput};
  font-size: 14px;

  ${({ isError }) => {
    if (isError) {
      return css`
        border: 2px solid red;
        color: #770000;
      `;
    }
  }}
  ${({ isActive, theme }) => {
    if (isActive) {
      return css`
        border: 2px solid ${theme.main};
      `;
    }
  }}
`;
export const ViewInfo = styled.View``;

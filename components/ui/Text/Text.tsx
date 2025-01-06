import styled, { css } from 'styled-components/native';

type TextTypeProps =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p1'
  | 'p2'
  | 'p3'
  | 'p4'
  | 'p5'
  | 'p6';

type TextProps = {
  type: TextTypeProps;
  color?: 'primary' | string;
};

export const Text = styled.Text<TextProps>`
  color: ${({ theme, color }) =>
    color === 'primary' ? theme.primary : color !== undefined ? color : theme.text};

  ${({ type }) => {
    switch (type) {
      case 'h1':
        return css`
          font-size: 32px;
          font-weight: bold;
        `;
      case 'h2':
        return css`
          font-size: 24px;
          font-weight: bold;
        `;
      case 'h3':
        return css`
          font-size: 20px;
          font-weight: bold;
        `;
      case 'h4':
        return css`
          font-size: 18px;
          font-weight: bold;
        `;
      case 'h5':
        return css`
          font-size: 16px;
          font-weight: bold;
        `;
      case 'h6':
        return css`
          font-size: 14px;
          font-weight: bold;
        `;
      case 'p1':
        return css`
          font-size: 22px;
          font-weight: normal;
        `;
      case 'p2':
        return css`
          font-size: 20px;
          font-weight: normal;
        `;
      case 'p3':
        return css`
          font-size: 18px;
          font-weight: normal;
        `;
      case 'p4':
        return css`
          font-size: 16px;
          font-weight: normal;
        `;
      case 'p5':
        return css`
          font-size: 14px;
          font-weight: normal;
        `;
      case 'p6':
        return css`
          font-size: 12px;
          font-weight: normal;
        `;
      default:
        return css`
          font-size: 16px;
          font-weight: normal;
        `;
    }
  }}
`;

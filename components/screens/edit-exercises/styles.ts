import styled from 'styled-components/native';

type CardContainerProps = {
  index: number;
};
export const SerieCardContainer = styled.View<CardContainerProps>`
  background-color: ${({ theme, index }) =>
    index % 2 === 0 ? theme.backgroundContrast : theme.background};
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
  border: ${({ theme }) => `1px solid ${theme.border}`};
`;

export const CardContainer = styled.View`
  margin: 10px 0;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.backgroundContrast};
  padding: 10px 10px;
  border-radius: 12px;
`;

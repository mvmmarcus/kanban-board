import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    padding: ${theme.spacings.xsmall} ${theme.spacings.medium};
    height: ${theme.spacings.xxxlarge};
    color: ${theme.colors.white};
  `}
`;

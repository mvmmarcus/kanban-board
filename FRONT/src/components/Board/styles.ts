import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: ${theme.spacings.medium} 0;
    background-color: ${theme.colors.lightBg};
    color: ${theme.colors.black};

    ${media.greaterThan("medium")`
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
    `}
  `}
`;

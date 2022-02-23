import styled, { css, DefaultTheme } from "styled-components";
import media from "styled-media-query";

import { HeadingProps, LineColors } from ".";

export const wrapperModifiers = {
  small: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.medium};

    &::after {
      width: 3rem;
    }
  `,

  medium: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.xlarge};

    ${media.greaterThan("medium")`
      font-size: ${theme.font.sizes.xxlarge};
    `}
  `,

  lineLeft: (theme: DefaultTheme, lineColor: LineColors) => css`
    padding-left: ${theme.spacings.xxsmall};
    border-left: 0.7rem solid ${theme.colors[lineColor]};
  `,
};

export const Wrapper = styled.h2<HeadingProps>`
  ${({ theme, lineLeft, lineColor = "gray", size }) => css`
    color: ${theme.colors.black};

    ${lineLeft && wrapperModifiers.lineLeft(theme, lineColor)}
    ${!!size && wrapperModifiers[size](theme)}
  `}
`;

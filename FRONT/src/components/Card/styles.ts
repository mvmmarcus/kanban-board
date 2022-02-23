import styled, { css, DefaultTheme } from "styled-components";
import media from "styled-media-query";

import { CardProps } from ".";

type WrapperProps = Pick<CardProps, "status">;

const wrapperModifers = {
  toDo: (theme: DefaultTheme) => css`
    border-top: ${theme.spacings.small} solid ${theme.colors.gray};
  `,
  doing: (theme: DefaultTheme) => css`
    border-top: ${theme.spacings.small} solid ${theme.colors.primary};
  `,
  done: (theme: DefaultTheme) => css`
    border-top: ${theme.spacings.small} solid ${theme.colors.secondary};
  `,
};

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, status }) => css`
    min-width: 18rem;
    box-shadow: 0 0.1rem 0.4rem 0 ${theme.colors.gray};
    background: ${theme.colors.white};
    border-radius: ${theme.border.radius};
    margin-bottom: ${theme.spacings.xsmall};
    padding: ${theme.spacings.xsmall};

    ${media.greaterThan("medium")`
      min-width: 20rem;
    `}

    ${!!status && wrapperModifers[status](theme)}
  `}
`;

export const Header = styled.header`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacings.xsmall};

    svg {
      cursor: pointer;
      width: 1.8rem;
      height: 1.8rem;
      color: ${theme.colors.black};
    }
  `}
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    font-weight: ${theme.font.normal};
    font-size: ${theme.font.sizes.xlarge};
    line-height: ${theme.font.sizes.xlarge};
  `}
`;

export const Content = styled.p`
  ${({ theme }) => css`
    min-height: ${theme.spacings.large};
    color: ${theme.colors.darkGray};
    font-size: ${theme.font.sizes.medium};
  `}
`;

export const TextArea = styled.textarea`
  ${({ theme }) => css`
    width: 100%;
    border-radius: 0.4rem;
    border: none;
    height: 10rem;
    font-weight: ${theme.font.normal};
    font-family: ${theme.font.family};
    color: ${theme.colors.darkGray};
    font-size: ${theme.font.sizes.medium};
    background: ${theme.colors.lightGray};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xsmall};

    &:focus {
      outline: 0.1rem solid ${theme.colors.black};
    }
  `}
`;

export const Footer = styled.footer<Pick<CardProps, "isNewCard">>`
  ${({ theme, isNewCard }) => css`
    display: flex;
    justify-content: ${isNewCard ? "center" : "space-between"};
    align-items: center;
    padding: ${theme.spacings.xsmall} 0 0;

    svg {
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      color: ${theme.colors.black};
    }
  `}
`;

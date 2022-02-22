import styled, { css, DefaultTheme } from "styled-components";

export type WrapperProps = {
  hasIcon: boolean;
};

const wrapperModifiers = {
  withIcon: (theme: DefaultTheme) => css`
    svg {
      width: 1.5rem;

      & + span {
        margin-left: ${theme.spacings.xxsmall};
      }
    }
  `,
  disabled: () => css`
    &:disabled {
      cursor: not-allowed;
      filter: saturate(30%);
    }
  `,
};

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, hasIcon, disabled }) => css`
    width: auto;
    height: 4rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #ff5f5f 0%, #f062c0 50%);
    border: 0;
    cursor: pointer;
    text-decoration: none;
    color: ${theme.colors.white};
    font-family: ${theme.font.family};
    border-radius: ${theme.border.radius};
    font-size: ${theme.font.sizes.small};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.medium};

    &:focus {
      box-shadow: 0 0 0 2px ${theme.colors.secondary};
    }

    &:hover {
      background: linear-gradient(180deg, #e35565 0%, #d958a6 50%);
    }

    ${!!hasIcon && wrapperModifiers.withIcon(theme)};
    ${disabled && wrapperModifiers.disabled()};
  `}
`;

import styled, { css, DefaultTheme } from "styled-components";

import { TextFieldProps } from ".";

type WrapperProps = Pick<TextFieldProps, "disabled"> & { error?: boolean };

export const InputWrapper = styled.div`
  ${({ theme }) => css`
    border-radius: 0.4rem;
    background: ${theme.colors.lightGray};

    &:focus-within {
      outline: 0.1rem solid ${theme.colors.black};
    }
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    width: 100%;
    background: transparent;
    border: 0;
    outline: none;
    font-weight: ${theme.font.normal};
    color: ${theme.colors.black};
    font-family: ${theme.font.family};
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xsmall};

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 ${theme.spacings.small}
        ${theme.colors.lightGray} inset;
      filter: none;
      &::first-line {
        font-family: ${theme.font.family};
        font-size: ${theme.font.sizes.medium};
      }
    }
  `}
`;

export const Error = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.xsmall};
  `}
`;

const wrapperModifiers = {
  error: (theme: DefaultTheme) => css`
    ${InputWrapper} {
      border-color: ${theme.colors.red};
    }
  `,
  disabled: (theme: DefaultTheme) => css`
    ${Input} {
      cursor: not-allowed;
      color: ${theme.colors.gray};

      &::placeholder {
        color: currentColor;
      }
    }
  `,
};

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, error, disabled }) => css`
    width: 100%;

    ${error && wrapperModifiers.error(theme)}
    ${disabled && wrapperModifiers.disabled(theme)}
  `}
`;

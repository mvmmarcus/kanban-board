import styled, { css } from "styled-components";
import media from "styled-media-query";

import { ColumnTypes } from ".";

import * as ModalStyles from "components/Modal/styles";

type WrapperProps = {
  type: ColumnTypes;
};

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme }) => css`
    width: 100%;
    max-width: 36rem;
    height: 100%;
    padding: ${theme.spacings.xsmall} ${theme.spacings.xsmall};
    margin: 0 ${theme.spacings.xsmall} ${theme.spacings.xsmall};
    background-color: ${theme.colors.lightGray};
    border-radius: ${theme.border.radius};

    ${media.greaterThan("small")`
      padding: ${theme.spacings.xsmall} ${theme.spacings.small};
    `}

    ${media.greaterThan("medium")`
      padding: ${theme.spacings.xsmall} ${theme.spacings.medium};
    `}

    ${ModalStyles.Wrapper} {
      width: 100%;
      max-width: 36rem;
    }
  `}
`;

export const Header = styled.header`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${theme.spacings.large};
  `}
`;

export const CardList = styled.ul`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.medium};
  `}
`;

export const EmptyMessage = styled.p`
  ${({ theme }) => css`
    text-align: center;
    margin-top: ${theme.spacings.small};
    color: ${theme.colors.darkGray};
    font-size: ${theme.font.sizes.xlarge};

    ${media.greaterThan("medium")`
      margin-top: ${theme.spacings.large};
    `}
  `}
`;

export const OrientationMessage = styled.p`
  ${({ theme }) => css`
    text-align: center;
    padding: 0 ${theme.spacings.xsmall};
    margin-top: ${theme.spacings.xsmall};
    color: ${theme.colors.gray};
    font-size: ${theme.font.sizes.xsmall};
  `}
`;

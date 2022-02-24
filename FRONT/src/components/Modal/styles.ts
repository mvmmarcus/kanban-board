import styled, { css } from "styled-components";

type OverlayProps = {
  isOpen?: boolean;
};

export const Title = styled.h2``;

export const Header = styled.header`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${theme.spacings.small};

    svg {
      cursor: pointer;
      width: ${theme.spacings.small};
      height: ${theme.spacings.small};
    }
  `}
`;

export const Overlay = styled.div<OverlayProps>`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
`;

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.small};
    background-color: ${theme.colors.white};
    border-radius: ${theme.border.radius};
  `}
`;

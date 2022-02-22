import React, {
  forwardRef,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";

import * as S from "./styles";

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  icon?: JSX.Element;
  as?: React.ElementType;
} & ButtonTypes;

const Button: React.ForwardRefRenderFunction<S.WrapperProps, ButtonProps> = (
  { children, icon, ...props },
  ref
) => (
  <S.Wrapper hasIcon={!!icon} ref={ref} {...props}>
    {icon}
    {!!children && <span>{children}</span>}
  </S.Wrapper>
);

export default forwardRef(Button);

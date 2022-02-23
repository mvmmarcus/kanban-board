import React, {
  forwardRef,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";

import { Wrapper, WrapperProps } from "./styles";

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  icon?: JSX.Element;
  as?: React.ElementType;
} & ButtonTypes;

const Button: React.ForwardRefRenderFunction<WrapperProps, ButtonProps> = (
  { children, icon, ...props },
  ref
) => (
  <Wrapper hasIcon={!!icon} ref={ref} {...props}>
    {icon}
    {!!children && <span>{children}</span>}
  </Wrapper>
);

export default forwardRef(Button);

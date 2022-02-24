import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import Button, { ButtonProps } from ".";
import { MdAdd } from "react-icons/md";
import theme from "styles/theme";

export default {
  title: "Button",
  component: Button,
  argTypes: {},
} as Meta<ButtonProps>;

export const Default: Story<ButtonProps> = (args) => <Button {...args} />;

Default.args = {
  children: "button",
};

export const IconButton: Story<ButtonProps> = (args) => <Button {...args} />;

IconButton.args = {
  icon: <MdAdd size={24} color={theme.colors.white} />,
};

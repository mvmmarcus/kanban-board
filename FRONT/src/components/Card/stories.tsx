import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import Card, { CardProps } from ".";

export default {
  title: "Card",
  component: Card,
  argTypes: {
    status: {
      control: {
        type: "select",
        options: ["toDo", "doing", "done"],
      },
    },
    title: {
      type: "string",
    },
    content: {
      type: "string",
    },
  },
} as Meta<CardProps>;

export const Todo: Story<CardProps> = (args) => (
  <div style={{ width: "100%", maxWidth: "32rem" }}>
    <Card {...args} />
  </div>
);

Todo.args = {
  status: "toDo",
  title: "Title",
  content: "Content",
};

export const Doing: Story<CardProps> = (args) => (
  <div style={{ width: "100%", maxWidth: "32rem" }}>
    <Card {...args} />
  </div>
);

Doing.args = {
  status: "doing",
  title: "Title",
  content: "Content",
};

export const Done: Story<CardProps> = (args) => (
  <div style={{ width: "100%", maxWidth: "32rem" }}>
    <Card {...args} />
  </div>
);

Done.args = {
  status: "done",
  title: "Title",
  content: "Content",
};

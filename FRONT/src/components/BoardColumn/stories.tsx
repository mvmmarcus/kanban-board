import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import BoardColumn, { BoardColumnProps } from ".";

export default {
  title: "BoardColumn",
  component: BoardColumn,
  argTypes: {
    type: {
      control: {
        type: "select",
        options: ["toDo", "doing", "done"],
      },
    },
    title: {
      type: "string",
    },
    showAddButton: {
      type: "boolean",
    },
  },
} as Meta<BoardColumnProps>;

export const Todo: Story<BoardColumnProps> = (args) => (
  <BoardColumn {...args} />
);

Todo.args = {
  type: "toDo",
  title: "To do",
  showAddButton: true,
  cards: [],
};

export const Doing: Story<BoardColumnProps> = (args) => (
  <BoardColumn {...args} />
);

Doing.args = {
  type: "doing",
  title: "Doing",
  cards: [],
};

export const Done: Story<BoardColumnProps> = (args) => (
  <BoardColumn {...args} />
);

Done.args = {
  type: "done",
  title: "Done",
  cards: [],
};

import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import Board, { BoardProps } from ".";
import Header from "components/Header";
import BoardColumn from "components/BoardColumn";

export default {
  title: "Board",
  component: Board,
  argTypes: {},
} as Meta<BoardProps>;

export const Default: Story<BoardProps> = () => (
  <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
    <Header />
    <Board>
      <BoardColumn title="To Do" type="toDo" cards={[]} showAddButton />
      <BoardColumn title="Doing" type="doing" cards={[]} />
      <BoardColumn title="Done" type="done" cards={[]} />
    </Board>
  </div>
);

Default.args = {};

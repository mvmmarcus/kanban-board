import React from "react";

import { Wrapper } from "./styles";

export type BoardProps = {
  children?: React.ReactNode;
};

const Board = ({ children }: BoardProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Board;

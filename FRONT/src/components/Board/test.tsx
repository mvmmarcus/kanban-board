import React from "react";

import { screen } from "@testing-library/react";

import Board from ".";
import { renderWithTheme } from "utils/test-utils";

describe("<Board />", () => {
  it("should render board component", () => {
    renderWithTheme(<Board>Board</Board>);

    expect(screen.getByText(/Board/i)).toBeInTheDocument();
  });
});

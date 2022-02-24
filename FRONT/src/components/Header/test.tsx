import React from "react";

import { screen } from "@testing-library/react";

import Header from ".";
import { renderWithTheme } from "utils/test-utils";

describe("<Header />", () => {
  it("should render Header component", () => {
    renderWithTheme(<Header />);

    expect(screen.getByText(/Kanban Board/i)).toBeInTheDocument();
  });
});

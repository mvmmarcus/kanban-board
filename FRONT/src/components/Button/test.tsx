import React from "react";

import { screen } from "@testing-library/react";

import Button from ".";
import { renderWithTheme } from "utils/test-utils";

describe("<Button />", () => {
  it("should render button component", () => {
    renderWithTheme(<Button>button</Button>);

    expect(screen.getByText(/button/i)).toBeInTheDocument();
  });

  it("should render disabled button", () => {
    renderWithTheme(<Button disabled>disabled</Button>);

    expect(screen.getByRole("button", { name: /disabled/i })).toHaveStyle(
      "cursor: not-allowed"
    );
  });
});

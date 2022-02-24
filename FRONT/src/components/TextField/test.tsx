import React from "react";

import { screen } from "@testing-library/react";

import theme from "styles/theme";
import { renderWithTheme } from "utils/test-utils";

import TextField from ".";

describe("<TextField />", () => {
  it("should render textfield component with initial value", () => {
    renderWithTheme(<TextField aria-label="input" initialValue="test" />);

    expect(screen.getByRole("textbox", { name: /input/i })).toBeInTheDocument();
  });

  it("should render disabled textfield component", () => {
    renderWithTheme(<TextField aria-label="input" disabled />);

    expect(screen.getByRole("textbox", { name: /input/i })).toHaveStyle(
      `color: ${theme.colors.gray}`
    );
    expect(screen.getByRole("textbox", { name: /input/i })).toHaveStyle(
      "cursor: not-allowed"
    );
  });

  it("should render textfield component with error", () => {
    renderWithTheme(<TextField aria-label="input" error="error message" />);

    expect(
      screen.getByRole("textbox", { name: /input/i }).parentElement
    ).toHaveStyle(`border-color: ${theme.colors.red}`);
    expect(screen.getByText("error message")).toHaveStyle(
      `color: ${theme.colors.red}`
    );
  });
});

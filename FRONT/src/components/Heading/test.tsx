import React from "react";

import { screen } from "@testing-library/react";

import theme from "styles/theme";
import Heading from ".";
import { renderWithTheme } from "utils/test-utils";

describe("<Heading />", () => {
  it("should render a white heading by default", () => {
    renderWithTheme(<Heading>To do</Heading>);
    expect(screen.getByRole("heading", { name: /To do/i })).toHaveStyle({
      color: theme.colors.black,
    });
  });

  it("should render a heading with a gray line left", () => {
    renderWithTheme(
      <Heading lineColor="gray" lineLeft>
        doing
      </Heading>
    );
    expect(screen.getByRole("heading", { name: /doing/i })).toHaveStyle({
      "border-left": `0.7rem solid ${theme.colors.gray}`,
    });
  });

  it("should render a heading with a medium size", () => {
    renderWithTheme(<Heading size="medium">done</Heading>);

    expect(screen.getByRole("heading", { name: /done/i })).toHaveStyle({
      "font-size": "2.0rem",
    });
  });

  it("should render a heading with a small size", () => {
    renderWithTheme(<Heading size="small">done</Heading>);

    expect(screen.getByRole("heading", { name: /done/i })).toHaveStyle({
      "font-size": "1.6rem",
    });
  });
});

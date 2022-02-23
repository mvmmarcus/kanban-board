import React from "react";

import { fireEvent, screen, waitFor } from "@testing-library/react";

import BoardColumn from ".";
import { renderWithTheme } from "utils/test-utils";

import theme from "styles/theme";

describe("<Board />", () => {
  it("should render default board component", () => {
    renderWithTheme(<BoardColumn title="To Do" type="toDo" cards={[]} />);

    expect(screen.getByRole("heading", { name: /To Do/i })).toBeInTheDocument();
    expect(screen.getByText(/No cards was found/i));
  });

  it("should render board component with one To Do card and try add new card", async () => {
    renderWithTheme(
      <BoardColumn
        title="To Do"
        type="toDo"
        cards={[
          {
            id: "123456",
            title: "card test",
            content: "content test",
            status: "toDo",
          },
        ]}
        showAddButton
      />
    );

    expect(screen.getByTestId("card-wrapper")).toHaveStyle(
      `border-top: 2.4rem solid  ${theme.colors.gray};`
    );
    expect(screen.getByRole("heading", { name: /To Do/i })).toBeInTheDocument();
    expect(screen.getByText(/card test/i)).toBeInTheDocument();
    expect(screen.getByText(/content test/i)).toBeInTheDocument();
    const addCardButton = screen.getByTestId("add-card-button");
    fireEvent.click(addCardButton);
    const saveButton = screen.getByTestId("arrow-check");
    await waitFor(() => {
      fireEvent.click(saveButton);
    });
  });

  it("should add new card to board board", async () => {
    const onAddCard = jest.fn();

    renderWithTheme(
      <BoardColumn
        title="title"
        type="toDo"
        cards={[]}
        showAddButton
        onAddCard={onAddCard}
      />
    );

    const addCardButton = screen.getByTestId("add-card-button");

    fireEvent.click(addCardButton);

    const cardTitleInput = screen.getByTestId("title-input");
    const cardContentTexarea = screen.getByTestId("content-textarea");
    const saveButton = screen.getByTestId("arrow-check");

    fireEvent.change(cardTitleInput, { target: { value: "test title" } });
    fireEvent.change(cardContentTexarea, { target: { value: "test content" } });
    await waitFor(() => {
      fireEvent.click(saveButton);
    });

    expect(onAddCard).toBeCalled();
  });
});

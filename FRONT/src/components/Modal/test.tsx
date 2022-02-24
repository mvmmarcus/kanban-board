import React from "react";

import { fireEvent, screen } from "@testing-library/react";

import Modal from ".";
import { renderWithTheme } from "utils/test-utils";

describe("<Modal />", () => {
  it("should render modal component", () => {
    renderWithTheme(
      <Modal isOpen title="modal title">
        modal
      </Modal>
    );

    expect(
      screen.getByRole("heading", { name: /modal title/i })
    ).toBeInTheDocument();
  });

  it("should no render modal component when isOpen is false", () => {
    const { container } = renderWithTheme(
      <Modal isOpen={false} title="modal title">
        modal
      </Modal>
    );

    expect(container.tagName).toBe("DIV");
  });

  it("should close on click on close button", () => {
    const onClose = jest.fn();
    renderWithTheme(
      <Modal isOpen title="modal title" onClose={onClose}>
        modal
      </Modal>
    );

    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});

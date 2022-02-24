import React from "react";

import axios, { AxiosResponse } from "axios";
import { fireEvent, screen, waitFor } from "@testing-library/react";

import Card from ".";
import { renderWithTheme } from "utils/test-utils";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("<Card />", () => {
  it("should render to Do card component", () => {
    renderWithTheme(<Card status="toDo" title="title" content="content" />);

    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });

  it("should try add new card", async () => {
    const mockedEditResponse: AxiosResponse = {
      data: {
        titulo: "updated title",
        conteudo: "updated content",
        lista: "doing",
        id: "12345",
      },
      config: {},
      headers: {},
      status: 200,
      statusText: "",
      request: "",
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockedEditResponse.data });

    renderWithTheme(
      <Card
        id="12345"
        status="done"
        title="title"
        content="content"
        isEditing
        isNewCard
      />
    );

    const saveButton = screen.getByTestId("arrow-check");

    await waitFor(() => {
      fireEvent.click(saveButton);
    });
  });

  it("should edit card title and content", async () => {
    const mockedEditResponse: AxiosResponse = {
      data: {
        titulo: "updated title",
        conteudo: "updated content",
        lista: "To do",
        id: "12345",
      },
      config: {},
      headers: {},
      status: 200,
      statusText: "",
      request: "",
    };

    mockedAxios.put.mockResolvedValueOnce({ data: mockedEditResponse.data });

    const onEdit = jest.fn();

    renderWithTheme(
      <Card
        id="12345"
        status="doing"
        title="title"
        content="content"
        onEdit={onEdit}
      />
    );

    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/content/i)).toBeInTheDocument();

    const editButton = screen.getByTestId("edit-button");

    await waitFor(() => {
      fireEvent.click(editButton);
    });

    const saveButton = screen.getByTestId("arrow-check");

    await waitFor(() => {
      fireEvent.click(saveButton);
    });

    expect(onEdit).toHaveBeenCalled();
  });

  it("should delete card", async () => {
    const mockedDeleteResponse: AxiosResponse = {
      data: [
        {
          titulo: "updated title",
          conteudo: "updated content",
          lista: "To do",
          id: "12345",
        },
      ],
      config: {},
      headers: {},
      status: 200,
      statusText: "",
      request: "",
    };

    mockedAxios.delete.mockResolvedValueOnce({
      data: mockedDeleteResponse.data,
    });

    const onDelete = jest.fn();

    renderWithTheme(
      <Card
        id="12345"
        status="doing"
        title="title"
        content="content"
        onDelete={onDelete}
      />
    );

    const deleteButton = screen.getByTestId("delete-button");

    await waitFor(() => {
      fireEvent.click(deleteButton);
    });

    expect(onDelete).toHaveBeenCalled();
  });

  it("should move card to another column and go back to initial column", async () => {
    const mockedDeleteResponse: AxiosResponse = {
      data: {
        titulo: "updated title",
        conteudo: "updated content",
        lista: "done",
        id: "12345",
      },
      config: {},
      headers: {},
      status: 200,
      statusText: "",
      request: "",
    };

    mockedAxios.put.mockResolvedValueOnce({
      data: mockedDeleteResponse.data,
    });

    const onEdit = jest.fn();

    renderWithTheme(
      <Card
        id="12345"
        status="doing"
        title="title"
        content="content"
        onEdit={onEdit}
      />
    );

    const arrowRightButton = screen.getByTestId("arrow-forward");
    const arrowLeftButton = screen.getByTestId("arrow-back");

    await waitFor(() => {
      fireEvent.click(arrowRightButton);
    });

    await waitFor(() => {
      fireEvent.click(arrowLeftButton);
    });

    expect(onEdit).toHaveBeenCalled();
  });
});

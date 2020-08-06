import React from "react";
import App from "./App.js";
import { mockEpisodes } from "./mock/mockEpisodes";
import { fetchShow as mockFetchShow } from "./api/fetchShow";
import {
  render,
  fireEvent,
  wait,
  getAllByTestId,
  queryAllByAltText,
} from "@testing-library/react";

jest.mock("./api/fetchShow.js");

test("renders component", () => {
  render(<App />);
});

test("test title renders", async () => {
  mockFetchShow.mockResolvedValueOnce({ data: mockEpisodes });

  const { getByText, queryAllByTestId } = render(<App />);

  expect(queryAllByTestId("episodes")).toHaveLength(0);

  const drop = getByText(/fetching data/i);
  fireEvent.click(drop);

  await wait();

  expect(queryAllByTestId("episodes")).toHaveLength(0);
});

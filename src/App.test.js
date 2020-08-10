import React from "react";
import App from "./App.js";
import { episodeData } from "./mock/epsiodeData";
import { mockEpisodes } from "./mock/mockEpisodes";
import { fetchShow as mockFetchShow } from "./api/fetchShow";
import {
  render,
  fireEvent,
  wait,
  getAllByTestId,
  queryAllByAltText,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("./api/fetchShow.js");

test("renders component", () => {
  mockFetchShow.mockResolvedValue({ data: episodeData });
  render(<App />);
});

test("Updates episodes list with dropdown change", async () => {
  mockFetchShow.mockResolvedValue({ data: episodeData });
  const { getByText, getAllByText, queryAllByTestId } = render(<App />);

  expect(queryAllByTestId("episodes")).toHaveLength(0);

  await wait();
  userEvent.click(getByText(/select a season/i));
  userEvent.click(getByText(/season 1/i));

  await wait();
  expect(queryAllByTestId("episodes")).toHaveLength(6);
});

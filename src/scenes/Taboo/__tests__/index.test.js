/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-container */
import userEvent from "@testing-library/user-event";
import React from "react";

import "@testing-library/jest-dom";
import categories from "../../../../public/data/categories.json"
import { initialState } from "../../../services/Redux/tabooSlice";
import { renderComponent } from "../../../services/utils/test-utils";

import Taboo from "../index";

const currentTabooItem = {
    "George Clooney": [
        "actor",
        "Hollywood",
        "Michael Clayton",
        "From Dusk till Dawn"
    ]
}

describe("Testing a Taboo component tests", () => {

  it("should render Taboo component without crash", () => {
    const { getByTestId, getByText, queryByTestId } = renderComponent(<Taboo />, {
        taboo: { ...initialState },
    });
    expect(getByText("Select Category")).toBeInTheDocument();
    expect(getByTestId("start-message")).toBeInTheDocument();
    expect(queryByTestId("taboo-game-container")).not.toBeInTheDocument();
    
  });

  it("should not render game container in start unless category is selected", async () => {
    const { getByTestId, getByText, queryByTestId, getByRole } = renderComponent(<Taboo />, {
        taboo: { ...initialState, categories: categories },
    });
    expect(queryByTestId("taboo-game-container")).not.toBeInTheDocument();

    // select category
    const browserEvent = userEvent.setup();
    const selectInput = getByRole("combobox");
    await browserEvent.click(selectInput);
    const option = getByText("Animals");
    await browserEvent.click(option);

    // it should render game container and hide start message
    expect(getByTestId("taboo-game-container")).toBeInTheDocument();
    expect(queryByTestId("start-message")).not.toBeInTheDocument();

    // as not playing yet so correct and skip buttons to be disabled
    expect(getByText("Correct")).toBeDisabled()
    expect(getByText("Skip")).toBeDisabled()
  });

  it("Category dropdown is disabled while playing", () => {
    const { queryByRole } = renderComponent(<Taboo />, {
        taboo: { ...initialState, categories: categories, isPlaying: true },
    });
    expect(queryByRole("combobox")).toBeNull()
  });

  it("Should render Taboo card data properly", async () => {
    const { getByRole, getByText, container } = renderComponent(<Taboo />, {
        taboo: { ...initialState, categories, currentTabooItem },
    });

    // select category
    const browserEvent = userEvent.setup();
    const selectInput = getByRole("combobox");
    await browserEvent.click(selectInput);
    const option = getByText("Famous People");
    await browserEvent.click(option);

    expect(container.querySelector(".taboo-title")).toHaveTextContent(
      Object.keys(currentTabooItem)[0]
    )
    const synonumsLength = container.querySelector(".taboo-synonumns-cotainer").children.length
    expect(synonumsLength).toBe(currentTabooItem["George Clooney"].length)
  })
});


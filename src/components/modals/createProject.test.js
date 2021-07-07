import { screen } from "@testing-library/react";
import CreateProject from "./createProject";

import { render } from "../../test-utils";

test("Initial modal title", () => {
  render(<CreateProject open />);
  const element = screen.getByTestId("title");
  expect(element).toHaveTextContent("Create project");
});

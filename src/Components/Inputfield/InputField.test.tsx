import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import InputField from "./InputField";

describe("InputField", () => {
  it("renders label and placeholder", () => {
    render(
      <InputField
        label="Name"
        placeholder="Enter name"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
  });

  it("shows error when invalid", () => {
    render(
      <InputField
        label="Email"
        value=""
        onChange={() => {}}
        invalid
        errorMessage="Invalid email"
      />
    );
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
    const input = screen.getByLabelText("Email") as HTMLInputElement;
    expect(input.getAttribute("aria-invalid")).toBe("true");
  });

  it("clears when clear button clicked", () => {
    const Wrapper = () => {
      const [v, setV] = React.useState("hello");
      return (
        <InputField
          label="Search"
          value={v}
          onChange={(e) => setV((e.target as HTMLInputElement).value)}
          clearable
        />
      );
    };
    render(<Wrapper />);
    const input = screen.getByLabelText("Search") as HTMLInputElement;
    expect(input.value).toBe("hello");
    const clearBtn = screen.getByRole("button", { name: /clear input/i });
    fireEvent.click(clearBtn);
    expect(input.value).toBe("");
  });
});

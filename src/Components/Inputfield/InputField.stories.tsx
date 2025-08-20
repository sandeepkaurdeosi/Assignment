import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import InputField, { type InputSize, type InputVariant } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
  args: {
    variant: "outlined" as InputVariant ,
    size: "md" as InputSize ,
    disabled: false,
    invalid: false,
    loading: false,
    clearable: true,
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["outlined", "filled", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

const Controlled = (args: any) => {
  const [val, setVal] = useState("");
  return (
    <div className="max-w-md">
      <InputField
        {...args}
        value={val}
        onChange={(e) => setVal((e.target as HTMLInputElement).value)}
      />
    </div>
  );
};

export const Playground: Story = {
  render: (args) => <InputField {...args} />,
  args: {
    label: "Username",
    placeholder: "Enter your username",
    helperText: "This will be public",
  },
};

export const ErrorState: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Email",
    placeholder: "name@example.com",
    invalid: true,
    errorMessage: "Please enter a valid email",
  },
};

export const Disabled: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Disabled",
    placeholder: "You can’t type here",
    disabled: true,
  },
};

export const Loading: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Searching",
    placeholder: "Type to search...",
    loading: true,
  },
};

export const Variants: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="flex max-w-md flex-col gap-4">
        <InputField
          {...args}
          label="Outlined"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant={args.variant}
          placeholder="Outlined…"
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    const [val, setVal] = useState("");
    return (
      <div className="flex max-w-md flex-col gap-4 outline-0">
        <InputField
          {...args}
          label="Demo Size"
          size={args.size}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Type here…"
        />
      </div>
    );
  },
};

export const ClearAndPassword: Story = {
  render: () => {
    const [u, setU] = useState("pre-filled");
    const [p, setP] = useState("secret123");
    return (
      <div className="flex max-w-md flex-col gap-4">
        <InputField
          label="Search"
          placeholder="Clearable field"
          clearable
          value={u}
          onChange={(e) => setU(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          passwordToggle
          value={p}
          onChange={(e) => setP(e.target.value)}
        />
      </div>
    );
  },
};


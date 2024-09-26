import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from "./Alert";

const meta = {
  component: Alert,
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "This is an alert", fullWidth: false },
};

export const Warning: Story = {
  args: {
    children: "This is an alert",
    fullWidth: true,
    variant: "warning",
    showIcon: true,
  },
};

export const Error: Story = {
  args: {
    children: "This is an alert",
    variant: "error",
    showIcon: true,
  },
};

export const Success: Story = {
  args: {
    children: "This is an alert",
    variant: "success",
    showIcon: true,
    title: "Success!",
  },
};

export const Info: Story = {
  args: {
    children: "This is an alert",
    variant: "info",
    showIcon: true,
    className: "min-w-[300px]",
  },
};

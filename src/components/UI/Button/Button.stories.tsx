import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const meta = {
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "secondary",
  },
};

export const Danger: Story = {
  args: {
    children: "Button",
    variant: "danger",
  },
};

export const Alert: Story = {
  args: {
    children: "Button",
    variant: "alert",
  },
};

export const WithIcon: Story = {
  args: {
    children: "Button",
    icon: faInfoCircle,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: "Button",
    icon: faInfoCircle,
    iconPosition: "right",
  },
};

export const WithCustomIcon: Story = {
  args: {
    children: "Button",
    icon: faInfoCircle,
    variant: "alert",
    iconPosition: "right",
    iconClassName: "text-accent-red",
  },
};

export const Large: Story = {
  args: {
    children: "Button",
    size: "lg",
  },
};

export const Small: Story = {
  args: {
    children: "Button",
    size: "sm",
  },
};

export const FullWith: Story = {
  args: {
    children: "Button",
    fullWidth: true,
  },
};

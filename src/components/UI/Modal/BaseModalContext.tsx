import React from "react";

type BaseModalContext = {
  onClose: () => void;
  title?: string;
  footer?: React.ReactNode;
  content?: React.ReactNode;
  contentClassName?: string;
};
const BaseModalContext = React.createContext<BaseModalContext | undefined>(
  undefined,
);
const useBaseModalContext = () => {
  const context = React.useContext(BaseModalContext);
  if (context === undefined) {
    throw new Error(
      "useBaseModalContext must be used within a BaseModalContext",
    );
  }
  return context;
};

export { BaseModalContext, useBaseModalContext };

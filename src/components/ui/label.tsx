import React from "react";

interface LabelProps {
  htmlFor?: string; // The id of the associated input element (optional)
  className?: string; // Optional additional CSS classes
  children: React.ReactNode; // The content of the label (required)
}

export const Label: React.FC<LabelProps> = ({ children, htmlFor, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-white-700 ${className || ""}`}
    >
      {children}
    </label>
  );
};

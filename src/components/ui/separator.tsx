import React from "react";

interface SeparatorProps {
  className?: string; // Optional prop for custom styling
}

export const Separator: React.FC<SeparatorProps> = ({ className }) => {
  return (
    <div
      className={`border-t border-gray-300 ${className || ""}`}
      role="separator"
    />
  );
};

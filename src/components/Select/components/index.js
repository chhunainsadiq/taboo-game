import React from "react";
import { components } from "react-select";

export function Control(controlProps) {
  return <components.Control className="menu-select" {...controlProps} />;
}

export function Placeholder({ isPlaceholder, ...controlProps }) {
  return (
    <components.Placeholder
      className="menu-select-placeholder"
      {...controlProps}
    >
      {isPlaceholder ? "Select" : ""}
    </components.Placeholder>
  );
}

export function SingleValue(controlProps) {
  return (
    <components.SingleValue
      className="menu-select-single-value"
      {...controlProps}
    />
  );
}
export function MenuList(controlProps) {
  return (
    <components.MenuList className="menu-select-menulist" {...controlProps}>
      {controlProps.children}
    </components.MenuList>
  );
}

export function Option(controlProps) {
  return (
    <components.Option
      className={`menu-select-option ${
        controlProps.isFocused ? "focused" : ""
      } ${controlProps.isSelected ? "selected" : ""}`}
      {...controlProps}
    />
  );
}

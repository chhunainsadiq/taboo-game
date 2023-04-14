import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

import {
  Control,
  Placeholder,
  SingleValue,
  MenuList,
  Option,
} from "./components/index";
import { StyledSelect, MenuSelectWrapper } from "./index.styled";

function MenuSelect({
  label,
  id,
  options,
  setValue,
  className,
  valueBased,
  overflow,
  maxWidth,
  isPlaceholder,
  ...props
}) {

  return (
    <MenuSelectWrapper className={className}>
      <div className="label-row">
        <label htmlFor={id}>{label}</label>
      </div>
      <StyledSelect
        data-testid={id}
      >
        <Select
          menuPosition={overflow ? "fixed" : "absolute"}
          menuPlacement="auto"
          {...props}
          onChange={async (e) => {
            setValue(e);
          }}
          inputId={id}
          data-testid={id}
          options={options}
          formatGroupLabel={(data) => (
            <span style={{ textTransform: "initial" }}>{data.label}</span>
          )}
          components={{
            Control,
            Placeholder: (controlProps) => (
              <Placeholder {...controlProps} isPlaceholder={isPlaceholder} />
            ),
            SingleValue,
            MenuList,
            Option,
          }}
        />
      </StyledSelect>
    </MenuSelectWrapper>
  );
}

MenuSelect.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.array,
  setValue: PropTypes.func.isRequired,
  overflow: PropTypes.bool,
  maxWidth: PropTypes.string,
  isPlaceholder: PropTypes.bool,
};

MenuSelect.defaultProps = {
  label: "",
  id: "",
  className: "",
  options: [],
  overflow: false,
  maxWidth: null,
  isPlaceholder: true,
};

export default MenuSelect;

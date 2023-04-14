import styled from "styled-components";

export const MenuSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  flex: 1;

  label {
    font-size: 14px;
    color: ${(props) => props.theme.colors.grayscale.gray2};
    margin-bottom: 0;
    word-break: break-word;
    text-align: "left";
  }

  .label-row {
    display: flex;
    align-items: center;
    margin-bottom: 0;
    label {
      color: ${(props) => props.theme.colors.grayscale.gray2};
      margin-bottom: 0;
    }
  }
`;

export const StyledSelect = styled.div`
  .menu-select {
    outline: 0;
    box-shadow: none;
    border-color: ${(props) => props.theme.colors.grayscale.gray3};
    font-size: 14px;
  }

  .menu-select-placeholder {
    font-size: 14px;
  }

  .menu-select-menulist {
    padding: 0;
  }

  .menu-select-single-value {
    color: ${(props) => props.theme.colors.font.dark};
  }

  .menu-select-option {
    font-size: 14px;
    color: ${(props) => props.theme.colors.primary};
    &.focused {
      background-color: ${(props) => props.theme.colors.grayscale.gray4};
      color: ${(props) => props.theme.colors.primary};
    }
    &.selected,
    &.selected:hover {
      background-color: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.font.light};
    }
    &:hover {
      background-color: ${(props) => props.theme.colors.grayscale.gray4};
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;


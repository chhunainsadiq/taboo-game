import PropTypes from "prop-types";
import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

const StyledModal = styled(ReactModal)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(29, 49, 65, 0.8);
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 1.2rem;
  z-index: 1031;

  .Overlay {
    z-index: 9;
  }
`;

function Modal({ children, open, setClose, ...props }) {
  return (
    <StyledModal
      ariaHideApp={false}
      isOpen={open}
      onRequestClose={() => setClose(false)}
      {...props}
      overlayClassName="Overlay"
      data-testid="taboo-modal-container"
    >
      {children}
    </StyledModal>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  setClose: PropTypes.func,
};

Modal.defaultProps = {
  children: null,
  open: false,
  setClose: () => {},
};

export default Modal;

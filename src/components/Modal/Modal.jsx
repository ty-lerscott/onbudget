import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import { InlineLoading, Modal as DefaultModal } from "carbon-components-react";

import "./Modal.scss";

const Modal = ({
  title,
  isOpen,
  children,
  className,
  isDisabled,
  isSubmitting,
  isScrollable,
  handleCloseModal,
  handlePrimaryClick,
  handleSecondaryClick,
  handleCloseModalComplete,
  ...props
}) => {
  const onCloseModal = async () => {
    await handleCloseModal();

    if (handleCloseModalComplete) {
      setTimeout(() => {
        handleCloseModalComplete();
      }, 300);
    }
  };
  return (
    <DefaultModal
      hasForm
      open={isOpen}
      modalHeading={title}
      secondaryButtonText="Clear"
      onRequestClose={onCloseModal}
      aria-label={`${title} Modal`}
      hasScrollingContent={isScrollable}
      onRequestSubmit={handlePrimaryClick}
      onSecondarySubmit={handleSecondaryClick}
      primaryButtonText={
        isSubmitting ? <InlineLoading /> : props.primaryButtonText || "Submit"
      }
      {...props}
      className={cn(
        "Modal",
        {
          "Modal--disabled": isDisabled,
          "Modal--submitting": isSubmitting,
        },
        className
      )}
    >
      {children}
    </DefaultModal>
  );
};

Modal.defaultProps = {
  preventCloseOnClickOutside: true,
};

Modal.propTypes = {
  size: PropTypes.string,
  hasForm: PropTypes.bool,
  children: PropTypes.node,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  isSubmitting: PropTypes.bool,
  isScrollable: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleCloseModalComplete: PropTypes.func,
  preventCloseOnClickOutside: PropTypes.bool,
  handleCloseModal: PropTypes.func.isRequired,
  handlePrimaryClick: PropTypes.func.isRequired,
  handleSecondaryClick: PropTypes.func.isRequired,
};

export default Modal;

import React, { ReactElement, ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

type PropType = {
  open: boolean;
  handleClose: () => void;
  children: ReactElement;
};
const CustomModal = ({ open, handleClose, children }: PropType) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      {children}
    </Modal>
  );
};

export default CustomModal;

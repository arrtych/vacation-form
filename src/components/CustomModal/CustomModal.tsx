import { Box, Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { ReactNode, useState } from "react";
import styles from "./CustomModal.module.css";

interface CustomModalProps {
  content: ReactNode;

  onClose: () => void;
  open: boolean;
}

const CustomModal: React.FC<CustomModalProps> = (props: CustomModalProps) => {
  const { open, onClose, content } = { ...props };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.box}>{content}</Box>
      </Modal>
    </div>
  );
};

export default CustomModal;

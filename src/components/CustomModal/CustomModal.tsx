import { Box, Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { ReactNode, useState } from "react";
import styles from "./CustomModal.module.css";

interface CustomModalProps {
  content: ReactNode;
  // onOpen: () => void;
  onClose: () => void;
  open: boolean;
}

const CustomModal: React.FC<CustomModalProps> = (props: CustomModalProps) => {
  // const [open, setOpen] = useState(false);
  const { open, onClose, content } = { ...props };
  // onOpen, onClose
  // const handleOpen = () => {
  //   setOpen(true);
  //   onOpen();
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   onClose();
  // };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
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

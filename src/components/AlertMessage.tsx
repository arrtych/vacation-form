import React from "react";
import Grid from "@mui/material/Grid2";
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface AlertMessageProps {
  message: string;
  onClick?: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = (
  props: AlertMessageProps
) => {
  const { message, onClick } = { ...props };
  return (
    <Grid size={12}>
      <Alert
        severity="error"
        action={
          onClick && (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClick}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )
        }
      >
        {message}
      </Alert>
    </Grid>
  );
};

export default AlertMessage;

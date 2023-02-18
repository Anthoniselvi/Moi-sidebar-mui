import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function DialogConfirmation() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpenDialog}>
        Delete
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={closeDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Delete Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do You want to delete the entry permanently?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeDialog}>
            No
          </Button>
          <Button onClick={closeDialog} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

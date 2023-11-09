import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { errorActions } from "../../Store/error";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const GlobelErrorSnackbar = () => {
  const showError = useSelector((state) => state.error.showMessage);
  const errorMessage = useSelector((state) => state.error.errorMessage);
  const severity = useSelector((state) => state.error.severity);
  const snackbarRef = React.useRef();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(errorActions.hideMessage());
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }} ref={snackbarRef}>
      <Snackbar
        open={showError}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default GlobelErrorSnackbar;

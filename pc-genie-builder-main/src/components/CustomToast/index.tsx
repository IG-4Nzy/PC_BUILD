import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { resetToast } from "@/redux/slice";

type PropType = {
  variant?: "outlined" | "filled" | "standard";
  styles?: Object;
  vertical?: "bottom" | "top";
  horizontal?: "center" | "left" | "right";
  closeButton?: boolean;
};

const SnackbarAlert = ({
  variant,
  styles,
  vertical = "top",
  horizontal = "center",
  closeButton = false
}: PropType) => {
  const { toast } = useAppSelector((state) => state.layoutReducer);

  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(toast?.open);

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(toast?.open);
    if (toast?.open) {
      setTimeout(() => {
        dispatch(resetToast());
      }, 4000);
    }
  }, [toast]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical, horizontal }}
      key={toast?.message || new Date().getTime()}
    >
      <Alert
        onClose={closeButton ? handleClose : undefined}
        severity={toast?.type}
        variant={variant}
        sx={{ ...styles, width: "100%" }}
      >
        {toast?.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;

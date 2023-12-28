import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";
import BasicButton from "../Material/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReviewDialog = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useImperativeHandle(ref, () => ({
    openDialog() {
      setOpen(true);
    },
  }));

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Discount Confirm"}</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 justify-center items-start">
            <p>School Name : {props.data?.schoolInfo?.school_name}</p>
            <p>School Code : {props.data?.schoolInfo?.school_code}</p>
            <p>Customer Name : {props.data?.customerInfo?.bp_name}</p>
            <p>Customer Code : {props.data?.customerInfo?.bp_code}</p>
            {props.data?.TodApplicable === "yes" ? (
              <p>TOD : {props.data?.TodApplicable.toUpperCase()}</p>
            ) : null}
            {props.data?.cash === "yes" ? (
              <>
                <p>Cash : {props.data?.cash.toUpperCase()}</p>
                <p>Cash % : {props.data?.cashPercentage}%</p>
              </>
            ) : null}
            {props.data?.specialDiscountOnOverallBusiness ? (
              <p>
                Overall Business Discount:{" "}
                {props.data?.specialDiscountOnOverallBusiness}%
              </p>
            ) : null}
            {props.data?.eltPercentage ? (
              <p>ELT Percentage: {props.data?.eltPercentage}%</p>
            ) : null}
            {props.data?.nonEltPercentage ? (
              <p>Non-ELT Percentage: {props.data?.nonEltPercentage}%</p>
            ) : null}
            {props.data?.publishers.length > 0
              ? props.data?.publishers.map((pub) => {
                  return (
                    <p>
                      Publisher Name: {pub?.bp_name}, Percentage:{" "}
                      {pub?.percentages}
                    </p>
                  );
                })
              : null}
            {props.data?.seriesData.length > 0
              ? props.data?.seriesData.map((series) => {
                  return (
                    <p>
                      Series Name: {series?.series}, Percentage:{" "}
                      {series?.percentages}
                    </p>
                  );
                })
              : null}
            {props.data?.titlesData.length > 0
              ? props.data?.titlesData.map((title) => {
                  return (
                    <p>
                      Title Name: {title?.item_name}, Percentage:{" "}
                      {title?.percentages}, Title Code: {title?.item_code}
                    </p>
                  );
                })
              : null}
          </div>
        </DialogContent>
        <DialogActions>
          <div onClick={handleClose}>
            <BasicButton text={"Cancel"} />
          </div>
          <div
            onClick={() => {
              handleClose();
              props.submitFunc();
            }}
          >
            <BasicButton text={"Submit"} />
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});

export default ReviewDialog;

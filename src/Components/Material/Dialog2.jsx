import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import SearchDropDown from "../SearchDropDown";
import BasicTextFields from "./TextField";
import BasicButton from "./Button";
import { useLayoutEffect, useEffect } from "react";
import instance from "../../Instance";
import { useState } from "react";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import Snackbars from "./SnackBar";
import { useRef } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogSlide2 = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [series, setSeries] = useState([]);
  const [grade, setGrade] = useState([]);
  const [mrp, setMrp] = useState("");
  const [total, setTotal] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [schlName, setSchlName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      series: "",
      grade: [],
      total: "",
      mrp: "",
      schoolName: "",
      schoolID: "",
      schoolCode: "",
    },
    validate: () => {},
    onSubmit: async (values) => {
      console.log(values);

      if (!values.schoolCode.length) {
        // console.log("first")
        setSnackbarErrStatus(true);
        setSnackbarMsg("Enter a value");
        snackbarRef.current.openSnackbar();
      } else {
        // console.log("second")
        setSnackbarErrStatus(false);
        setSnackbarMsg("No of school added");
        snackbarRef.current.openSnackbar();
        setOpen(false);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      }
      // const res = await instance({
      //   url: `projections/create`,
      //   method: "post",
      //   data: {
      //     fk_series_id: values.series,
      //     quantity: values.quantity,
      //     mrp: mrp,
      //     total: total,
      //     fk_grade: values.grade,
      //   },
      //   headers: {
      //     Authorization: Cookies.get("accessToken"),
      //   },
      // });
      // console.log(res.data);
      // if (res.data.status === "success") {
      // }
    },
  });

  // useEffect(()=>{
  //   setSchlName("")
  // })

  useLayoutEffect(() => {
    const getAllSeries = async () => {
      const res = await instance({
        url: `series/get/all`,
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setSeries(res.data.message);
      //   console.log(res.data.message);
    };
    const getAllGrade = async () => {
      const res = await instance({
        url: `grades/getAll`,
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setGrade(res.data.message);
      //   console.log(res.data.message);
    };
    getAllSeries();
    getAllGrade();
  }, []);

  const snackbarRef = useRef();

  React.useImperativeHandle(ref, () => ({
    openDialog() {
      setOpen(true);
    },
  }));

  const handleButtonClick = () => {
    props.handleDialogButton();
    setOpen(false);
  };

  const getSeriesPrice = async (id) => {
    const res = await instance({
      url: `series/get/seriessum/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setMrp(res.data.message.sum);
  };

  const handleProjectionForm = (value, type) => {
    // console.log(value, type);
    switch (type) {
      case "series_name":
        getSeriesPrice(value.id);
        formik.values.series = value.id;
        break;
      case "grades":
        formik.values.grade = value.map((item) => {
          return { fk_grade_id: item.id };
        });
        break;
      case "Quantity":
        formik.values.quantity = value;
        setTotal(mrp * value);
        break;
      case "School Code":
        console.log(value);
        formik.values.schoolCode = value;
        break;
      case "School Name":
        // console.log(value);
        setSchlName(value.school_name);
        formik.values.schoolName = value.school_name;
        formik.values.schoolID = value.id;
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getSchoolName = async (code) => {
    // setLoading(true);
    const res = await instance({
      url: `school/ckschools/get/bycode/${code}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    if (res.data.message) {
      // console.log(res.data.message);
      handleProjectionForm(res.data.message, "School Name");
    }
  };

  const handleUpadateInvoice = async () => {
    console.log("invoiceid= ", props.invoiceId);
    console.log("Schoolid= ", formik.values.schoolID);

    const res = await instance({
      url: `ckInvoice/upadateckinvoices/${props.invoiceId}/${formik.values.schoolID}`,
      method: "PUT",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });

    if (res.data.status === "success") {
      console.log(res.data);
      setSnackbarErrStatus(false);
      setErrMessage("res.data.message");
      snackbarRef.current.openSnackbar();
      setOpen(false);
      setSchlName("");
    }
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbars
        ref={snackbarRef}
        snackbarErrStatus={snackbarErrStatus}
        errMessage={snackbarMsg}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className="!w-[100vw]"
        maxWidth={"md"}
        fullWidth
      >
        <DialogTitle className="!bg-gray-500 text-white">
          Enter School Code
        </DialogTitle>
        <DialogContent className="!bg-gray-500 flex justify-center items-center">
          <DialogContentText
            id="alert-dialog-slide-description"
            className="!text-gray-600 !sm:text-base !text-sm grid sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-6"
          >
            {/* <SearchDropDown
              label={"Select Series"}
              color={"rgb(243, 244, 246)"}
              data={series}
              Name={"series_name"}
              handleOrderProcessingForm={handleProjectionForm}
            /> */}
            {/* <SearchDropDown
              label={"Select Grade"}
              color={"rgb(243, 244, 246)"}
              handleOrderProcessingForm={handleProjectionForm}
              data={grade}
              multiple={true}
              Name={"grades"}
            /> */}
            <TextField
              required
              label="School Code"
              variant="standard"
              type={"text"}
              disabled={false}
              // defaultValue="0"
              InputLabelProps={{ style: { color: "white" } }}
              onBlur={(newValue) => getSchoolName(newValue.target.value)}
            />

            <TextField
              className="!w-[300px]"
              required
              label="School Name"
              variant="standard"
              type={"text"}
              disabled={false}
              defaultValue={schlName}
              value={schlName}
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ readOnly: true }}
              //   onBlur={() =>
              //     handleProjectionForm("newValue", "School Name")
              //   }
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions className="!bg-gray-500">
          {/* <Button onClick={() => handleButtonClick()}>Ok</Button> */}
          {/* <Button onClick={handleClose}>Cancle</Button> */}
          <div
            onClick={() => {
              console.log(schlName.length);
              if (schlName.length === 0) {
                console.log("error");
                setSnackbarErrStatus(true);
                setErrMessage("Please Enter All the Fields");
                snackbarRef.current.openSnackbar();
              } else {
                handleUpadateInvoice();
              }
            }}
          >
            <BasicButton text={"Submit"} />
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default DialogSlide2;

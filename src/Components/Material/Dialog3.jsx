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
import { useLayoutEffect } from "react";
import instance from "../../Instance";
import { useState } from "react";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import Snackbars from "./SnackBar";
import { useRef } from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

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
  const [schlName, setSchlName] = useState("default");
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [cardNum, setCardNum] = useState("");
  const [DocDate, setDocDate] = useState("");
  const [DocTotal, setDocTotal] = useState("");
  const [BillFrom, setBillFrom] = useState("");
  const [BillTo, setBillTo] = useState("");
  const [schoolCode, setschoolCode] = useState("");
  const [DispatchFrom, setDispatchFrom] = useState("");
  const [ShipsTo, setShipsTo] = useState("");

  const formik = useFormik({
    initialValues: {
      CardNum: "",
      DocDate: "",
      DocTotal: "",
      BillFrom: "",
      BillTo: "",
      schoolCode: "",
      DispatchFrom: "",
      ShipsTo: "",
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
    },
  });


  const getInvoiceDetails = async () => {
    console.log(props.invoiceId);
    const res = await instance({
      url: `ckInvoice/getckinvoices/${props.invoiceId}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // setSeries(res.data.message);
    // console.log("first")
    if (res.data.status === "success") {
      setCardNum(res.data.message[0].docnum);
      // formik.values.DocNum = res.data.message[0].docnum;
      setDocDate(res.data.message[0].docdate)
      // formik.values.DocDate = res.data.message[0].docdate;
      // formik.values.DocTotal = res.data.message[0].doctotal;
      setDocTotal(res.data.message[0].doctotal)
      // formik.values.BillFrom =
        // res.data.message[0].ck_invoice_addresses[0].BillFromName;
        setBillFrom(res.data.message[0].ck_invoice_addresses[0].BillFromName)
      // formik.values.BillTo =
        // res.data.message[0].ck_invoice_addresses[0].BillToName;
        setBillTo(res.data.message[0].ck_invoice_addresses[0].BillToName)
      // console.log(res.data.message[0].ck_invoice_addresses[0].BillToName)
      // formik.values.DispatchFrom =
        // res.data.message[0].ck_invoice_addresses[0].DispatchFromAddress1;
        setDispatchFrom(res.data.message[0].ck_invoice_addresses[0].DispatchFromAddress1)
      // formik.values.ShipsTo =
      //   res.data.message[0].ck_invoice_addresses[0].ShipToAddress1;

        setShipsTo(res.data.message[0].ck_invoice_addresses[0].ShipToAddress1)

      // setInvoiceDetails(res.data.message);
      setInvoiceItems(res.data.message[0].ck_invoice_items);
      // console.log(res.data.message[0].docnum)
    }
  };



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
      getInvoiceDetails();
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
    console.log(value, type);
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
        console.log(value);
        setSchlName(value);
        formik.values.schoolName = value;
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getName = (code) => {
    handleProjectionForm(code, "School Code");
    handleProjectionForm("newValue", "School Name");
  };

  return (
    <div>
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
        maxWidth={"lg"}
        fullWidth
      >
        <DialogTitle className="!bg-gray-500 text-white">
          {/* <div
            onClick={() => {
              getInvoiceDetails();
            }}
          >
            <BasicButton text={"Show Data"} />
          </div> */}
        </DialogTitle>
        <DialogContent className="!bg-gray-500">
          <DialogContentText
            id="alert-dialog-slide-description"
            className="!text-gray-600 !sm:text-base !text-sm grid sm:grid-cols-1 grid-cols-1 sm:gap-8 gap-6"
          >
            {/* <TextField
              required
              label="Card Name"
              variant="standard"
              type={"text"}
              disabled={false}
              // defaultValue={invoiceDetails[0].cardname}
              // value={invoiceDetails[0].cardname}
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ readOnly: true }}
            /> */}

          <div className="flex justify-end">
          <IconButton onClick={handleClose}>
            <CloseIcon />
        </IconButton>
          </div>
            

            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid xs={2} sm={4} md={4}>
                  <TextField
                    label="Doc Num"
                    variant="standard"
                    type={"text"}
                    disabled={false}
                    // defaultValue={formik.values.DocNum}
                    defaultValue={cardNum}
                    value={cardNum}
                    // value={formik.values.DocNum}
                    InputLabelProps={{ style: { color: "white" } }}
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid xs={2} sm={4} md={4}>
                  <TextField
                    label="Doc Date"
                    variant="standard"
                    type={"text"}
                    disabled={false}
                    defaultValue={DocDate}
                    value={DocDate}
                    InputLabelProps={{ style: { color: "white" } }}
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid xs={2} sm={4} md={4}>
                  <TextField
                    label="Doc Total"
                    variant="standard"
                    type={"text"}
                    disabled={false}
                    defaultValue={DocTotal}
                    value={DocTotal}
                    InputLabelProps={{ style: { color: "white" } }}
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContentText>
          {/* </DialogContent> */}

          <div className="mt-9">
            <DialogTitle className="!bg-gray-500 text-white">
              Address
            </DialogTitle>
            {/* <DialogContent className="!bg-gray-500"> */}
            <DialogContentText
              id="alert-dialog-slide-description"
              className="!text-gray-600 !sm:text-base !text-sm grid sm:grid-cols-1 grid-cols-1 sm:gap-8 gap-6"
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid xs={2} sm={6} md={6}>
                    <TextField
                      className="!w-full"
                      label="Bill From"
                      variant="standard"
                      type={"text"}
                      disabled={false}
                      defaultValue={BillFrom}
                      value={BillFrom}
                      InputLabelProps={{ style: { color: "white" } }}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid xs={2} sm={6} md={6}>
                    <TextField
                      className="!w-full"
                      label="Bill To"
                      variant="standard"
                      type={"text"}
                      disabled={false}
                      defaultValue={BillTo}
                      value={BillTo}
                      InputLabelProps={{ style: { color: "white" } }}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
            
              
                </Grid>

                <div className="mt-4">
                <Grid container spacing={2}>
                  <Grid xs={12}>
                  <TextField
                      className="!w-full "
                      // id="outlined-multiline-static"
                      // multiline
                      label="Dispatch From"
                      variant="standard"
                      type={"text"}
                      disabled={false}
                      defaultValue={DispatchFrom}
                      value={DispatchFrom}
                      InputLabelProps={{ style: { color: "white" } }}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid xs={12}>
                  <TextField
                      className="!w-full"
                      // multiline
                      label="Ships To"
                      variant="standard"
                      type={"text"}
                      disabled={false}
                      defaultValue={ShipsTo}
                      value={ShipsTo}
                      InputLabelProps={{ style: { color: "white" } }}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
                </div>
           
              </Box>
            </DialogContentText>
          </div>

          {/* </DialogContent> */}

          <div className="mt-9">
            <DialogTitle className="!bg-gray-500 text-white">Items</DialogTitle>
            {/* <DialogContent className="!bg-gray-500"> */}
            <DialogContentText
              id="alert-dialog-slide-description"
              className="!text-gray-600 !sm:text-base !text-sm grid sm:grid-cols-1 grid-cols-1 sm:gap-8 gap-6"
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="customized table">
                  <TableHead className="bg-slate-500">
                    <TableRow>
                      <TableCell className="!w-[18rem]" align="center">
                        Item
                      </TableCell>
                      <TableCell className="!w-[8rem]" align="center">
                        Price
                      </TableCell>
                      <TableCell className="!w-[8rem]" align="center">
                        Quantity
                      </TableCell>
                      <TableCell className="!w-[8rem]" align="center">
                        Discount %
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="bg-slate-200">
                    {invoiceItems.map((row) => (
                      <TableRow
                      // key={row.series}
                      // sx={{
                      // "&:last-child td, &:last-child th": { border: 0 },
                      // }}
                      >
                        <TableCell align="center">
                          {row.itemdescription}
                        </TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">{row.quantity}</TableCell>
                        <TableCell align="center">
                          {row.discountpercent}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContentText>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default DialogSlide2;

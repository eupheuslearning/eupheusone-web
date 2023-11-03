import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import instance from "../../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import BasicButton from "../../Components/Material/Button";
import { ShowError } from "../../util/showError";
import {
  Backdrop,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import UploadButton from "../../Components/Material/UploadButton";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BasicTextFields from "../../Components/Material/TextField";
import { useFormik } from "formik";

const AllReturn = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("manage_return_req");
  const [returnData, setReturnData] = useState([]);
  const sidebarRef = useRef();
  const [loading, setLoading] = useState(false);

  const navInfo = {
    title: "Manage Order Return",
    details: ["Home", " / Manage Order Return"],
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };
  const getReturnData = async () => {
    const data = await instance({
      url: "sales_data/get-returns",
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setReturnData(data.data.data);
  };
  useLayoutEffect(() => {
    getReturnData();
  }, []);

  const uploadAttachment = async (file, id) => {
    let formdata = new FormData();
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      ShowError("Please Select an image file only");
      return;
    }
    formdata.append("img", file);
    formdata.append("test", "test");
    setLoading(true);
    const res = await instance({
      url: `imagetoS3/add_image_s3`,
      method: "POST",
      data: formdata,
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    }).catch(() => {
      setLoading(false);
    });
    let link = res.data;
    if (res.status === 200) {
      const attachment = await instance({
        url: `sales_data/update-return-attachment`,
        method: "PUT",
        data: {
          id: id,
          attachment: link,
        },
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      }).catch(() => {
        setLoading(false);
      });
      if (attachment.data.status === "success") {
        getReturnData();
      }
    } else {
      ShowError("Cannot upload image");
    }
    setLoading(false);
  };

  const getPrint = async (id) => {
    setLoading(true);
    const res = await instance({
      url: `sales_data//get-return-pdf/${id}`,
      method: "GET",
      data: {
        id: id,
      },
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(res.data.message);
    setLoading(false);

    window.open(res?.data?.data);
  };

  const SubmitReturn = async (id) => {
    setLoading(true);
    const attachment = await instance({
      url: `sales_data/update-return-status`,
      method: "PUT",
      data: {
        id: id,
      },
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    }).catch(() => {
      setLoading(false);
    });
    if (attachment.data.status === "success") {
      window.alert("Return marked as final submit");
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleWidth = () => {
      if (window.innerWidth > 1024) {
        setSidebarCollapsed(false);
      } else {
        setSidebarCollapsed(true);
      }
    };
    window.addEventListener("resize", handleWidth);
    handleWidth();
    window.scroll(0, 0);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);
  return (
    <div className="flex bg-[#111322]">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Sidebar sidebarCollapsed={sidebarCollapsed} highLight={highLight} />

      <div>
        <SwipeableTemporaryDrawer
          ref={sidebarRef}
          sidebarCollapsed={sidebarCollapsed}
          highLight={highLight}
        />
      </div>

      <div
        className={`flex flex-col w-[100vw] lg:w-[83vw] lg:ml-[18vw] ${
          window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[60vw]"
        } `}
      >
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div
            className={`sm:px-8 px-4 py-3 grid sm:grid-cols-1 grid-cols-1 gap-4 bg-[#141728]`}
          >
            {returnData.map((item, index) => {
              return <ReturnDetails data={item} setLoading={setLoading} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ReturnDetails = ({ data, setLoading }) => {
  const [expanded, setExpended] = useState(false);
  const [items, setItems] = useState([]);

  const formik = useFormik({
    initialValues: {
      items: [],
      remarks: "",
      grNumber: "",
      grDate: "",
      numOfBoxes: "",
      recievedQty: "",
      transporterName: "",
    },
    validate: (values) => {
      //   const errors = {};
      //   if (
      //     !values.return_type ||
      //     !values.sales_order_num ||
      //     !values.cutomer_name ||
      //     !values.school_code ||
      //     !values.s_address ||
      //     !values.b_address ||
      //     !values.return_ref ||
      //     !values.bp_contact_id ||
      //     !values.school ||
      //     !values.grNum ||
      //     !values.grDate ||
      //     !values.numOfBoxes ||
      //     !values.pref_transpoter_name
      //   ) {
      //     ShowError("All fields are required");
      //     errors.return_type = "Required";
      //     return errors;
      //   }
    },
    onSubmit: async (values) => {
      //   setLoading(true);
      //   const res = await instance({
      //     url: `sales_data/createreturn`,
      //     method: "POST",
      //     headers: {
      //       Authorization: `${Cookies.get("accessToken")}`,
      //     },
      //     data: {
      //       returnType: values.return_type,
      //       returnReference: values.return_ref,
      //       salesOrderNumber: values.sales_order_num,
      //       salesOrderDate: values.order_date,
      //       returnDate: values.returnDate,
      //       schoolCode: values.school_code,
      //       bpId: values.cutomer_name,
      //       schoolId: values.school,
      //       transporterName: "test",
      //       contactId: values.bp_contact_id,
      //       remarks: values.remarks,
      //       grNumber: values.grNum,
      //       grDate: values.grDate,
      //       numberOfBoxes: values.numOfBoxes,
      //       quantity: value.total_quan,
      //       amount: value.total,
      //       shippingAddressId: values.s_address,
      //       billingAddressId: values.b_address,
      //       isFullCancel: !values.full_return,
      //       items: values.items.map((item) => {
      //         return {
      //           itemId: item.id,
      //           quantity: item.quantity,
      //           itemCode: item.item_id,
      //           series: item.series,
      //           grade: item.grade,
      //           price: item.price,
      //           discountPercent: item.discount,
      //         };
      //       }),
      //     },
      //   }).catch(() => {
      //     setLoading(false);
      //   });
      //   if (res.data.status === "success") {
      //     setErrMessage(res.data.message);
      //     setSnackbarErrStatus(false);
      //     snackbarRef.current.openSnackbar();
      //     setTimeout(() => {
      //       window.location.reload();
      //     }, 2000);
      //   }
      //   setLoading(false);
      console.log(values);
    },
  });

  const getItems = async () => {
    const res = await instance({
      url: `sales_data/get-return-details/${data.id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    }).catch(() => {
      setLoading(false);
    });
    if (res.status === 200) {
      res.data.data.return_processing_items.map((item) => {
        formik.values.items.push({
          ...item,
          recievedQty: 0,
          damageQty: 0,
          defective: 0,
        });
      });
      setItems(res.data.data.return_processing_items);
    }
  };

  return (
    <Accordion
      expanded={expanded}
      className="!bg-slate-500"
      onChange={async () => {
        if (items.length === 0) {
          setLoading(true);
          await getItems();
          setLoading(false);
        }
        setExpended((prev) => {
          return !prev;
        });
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{
          width: "100%",
        }}
      >
        <div className="w-full flex gap-2 text-gray-100 font-semibold">
          <span>Return Type: {data.return_type},</span>
          <span>Return Reference: {data.return_ref},</span>
          <span>School Code: {data.school_code},</span>
          <span>School Name: {data.fk_school.school_name},</span>
          <span>Sales Order Date: {data.sales_order_date},</span>
          <span>Return Date: {data.return_date}</span>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Paper>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead className="bg-slate-400">
                <TableRow>
                  <TableCell
                    className="!w-[15rem] !font-semibold"
                    align="center"
                  >
                    Item Name
                  </TableCell>
                  <TableCell
                    className="!w-[15rem] !font-semibold"
                    align="center"
                  >
                    Item Code
                  </TableCell>
                  <TableCell
                    className="!w-[15rem] !font-semibold"
                    align="center"
                  >
                    Received QTY
                  </TableCell>
                  <TableCell
                    className="!w-[15rem] !font-semibold"
                    align="center"
                  >
                    Damage QTY
                  </TableCell>

                  <TableCell
                    className="!w-[8rem] !font-semibold"
                    align="center"
                  >
                    Defective QTY
                  </TableCell>
                </TableRow>
              </TableHead>
              {items.length !== 0 &&
                items.map((item, index) => {
                  return (
                    <TableBody className="bg-slate-300">
                      <TableRow
                        key={item.id}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell align="left">{item.item_name}</TableCell>
                        <TableCell align="center">{item.item_code}</TableCell>
                        <TableCell align="center">
                          <TextField
                            type={"number"}
                            className="text_black"
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            type={"number"}
                            className="text_black"
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            type={"number"}
                            className="text_black"
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  );
                })}
            </Table>
          </TableContainer>
        </Paper>
        <div className="w-full flex gap-4 mt-8">
          <BasicTextFields lable={"Remarks"} />
          <BasicTextFields lable={"GR number"} defaultValue={data?.gr_number} />
          <BasicTextFields lable={"GR date"} />
          <BasicTextFields lable={"No of boxes"} defaultValue={data?.boxes} />
          <BasicTextFields lable={"Received QTY"} />
          <BasicTextFields
            lable={"Transporter name"}
            defaultValue={data?.transporter_name}
          />
        </div>
        <div className="w-full flex gap-4 mt-8">
          <BasicButton size={"small"} text={"Reject"} />
          <div onClick={formik.handleSubmit}>
            <BasicButton size={"small"} text={"Approve"} />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default AllReturn;

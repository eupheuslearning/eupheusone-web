import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import instance from "../../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import BasicButton from "../../Components/Material/Button";
import { ShowError, ShowSuccess } from "../../util/showError";
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
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BasicTextFields from "../../Components/Material/TextField";
import { useFormik } from "formik";
import DatePicker from "../../Components/Material/Date";

const AllReturnWarehouse = () => {
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
            {returnData.length === 0 && (
              <p className="w-full flex justify-center text-gray-100 text-lg font-semibold">
                No Data Found
              </p>
            )}
            {returnData.map((item, index) => {
              return !item.qc_status ? (
                <ReturnDetails
                  key={index}
                  data={item}
                  setLoading={setLoading}
                />
              ) : null;
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
      qcRemark: "",
    },
    validate: (values) => {
      const errors = {};
      let qtyError = false;

      for (let i = 0; i < values.items.length; i++) {
        const item = values.items[i];
        if (
          item.received_quantity === 0 ||
          item.damaged_quantity === 0 ||
          item.defective_quantity === 0
        ) {
          qtyError = true;
          break;
        }
      }

      if (qtyError) {
        ShowError(
          "Please fill Received Quantity, Damage Quantity and Defective Quantity for all items"
        );
        errors.remarks = "Required";
        return errors;
      } else if (!values.qcRemark) {
        ShowError("Please Enter Remarks");
        errors.remarks = "Required";
        return errors;
      }
    },
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      // updating return
      const res = await instance({
        url: `sales_data/update-return-qc`,
        method: "PUT",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
        data: {
          id: data.id,
          remarks: values.qcRemark,
          grNumber: data.gr_number,
          grDate: data.gr_date,
          numberOfBoxes: data.boxes,
          transporterName: data.transporter_name,
          items: values.items.map((item) => {
            return {
              id: item.id,
              receivedQuantity: item.received_quantity,
              damagedQuantity: item.damaged_quantity,
              defectiveQuantity: item.defective_quantity,
            };
          }),
        },
      }).catch(() => {
        setLoading(false);
        ShowError("Couldn't update return");
      });
      // approve return
      if (res.data.status === "success") {
        const approve = await instance({
          url: `sales_data//submit-return-qc/${data.id}`,
          method: "PATCH",
          headers: {
            Authorization: `${Cookies.get("accessToken")}`,
          },
        }).catch(() => {
          setLoading(false);
          ShowError("Something went wrong");
        });

        if (approve.data.status === "success") {
          ShowSuccess(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }

      setLoading(false);
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
      formik.values.items = res.data.data.return_processing_items;

      setItems(res.data.data.return_processing_items);
    }
  };

  const alterQuantity = (id, type, value) => {
    for (let i = 0; i < formik.values.items.length; i++) {
      const ele = formik.values.items[i];
      if (ele.id === id) {
        ele[type] = Number(value);
        break;
      }
    }
  };

  const rejectReturn = async () => {
    setLoading(true);
    if (!formik.values.qcRemark) {
      ShowError("Please add remarks");
    } else {
      const res = await instance({
        url: `sales_data/reject-return-qc`,
        method: "PUT",
        data: {
          id: data.id,
          remarks: `REJECTED! ${formik.values.qcRemark}`,
        },
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      }).catch(() => {
        setLoading(false);
      });
      if (res.status === 200 && res.data.status === "success") {
        ShowSuccess(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    }
    setLoading(false);
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
                    className="!w-[25rem] !min-w-[25rem] !font-semibold"
                    align="center"
                  >
                    Series
                  </TableCell>
                  <TableCell
                    className="!w-[15rem] !min-w-[10rem] !font-semibold"
                    align="center"
                  >
                    Grade
                  </TableCell>
                  <TableCell
                    className="!w-[8rem] !font-semibold"
                    align="center"
                  >
                    Received QTY
                  </TableCell>
                  <TableCell
                    className="!w-[8rem] !font-semibold"
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
                            className="text_black !w-full"
                            variant="outlined"
                            size="small"
                            disabled
                            defaultValue={item?.series}
                            onChange={(e) => {
                              console.log(formik.values.items[index]);
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            className="text_black"
                            variant="outlined"
                            size="small"
                            disabled
                            defaultValue={item?.grade}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            type={"number"}
                            className="text_black"
                            variant="outlined"
                            size="small"
                            defaultValue={item?.received_quantity}
                            onChange={(e) => {
                              alterQuantity(
                                item.id,
                                "received_quantity",
                                e.target.value
                              );
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            type={"number"}
                            className="text_black"
                            variant="outlined"
                            size="small"
                            defaultValue={item?.damaged_quantity}
                            onChange={(e) => {
                              alterQuantity(
                                item.id,
                                "damaged_quantity",
                                e.target.value
                              );
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            type={"number"}
                            className="text_black"
                            variant="outlined"
                            size="small"
                            defaultValue={item?.defective_quantity}
                            onChange={(e) => {
                              alterQuantity(
                                item.id,
                                "defective_quantity",
                                e.target.value
                              );
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  );
                })}
            </Table>
          </TableContainer>
        </Paper>
        <div className="w-full flex gap-4 mt-8 flex-wrap">
          <BasicTextFields
            lable={"Remarks"}
            handleOrderProcessingForm={(value, name) => {
              formik.values.qcRemark = value;
            }}
          />
          <BasicTextFields
            lable={"Sales Coordinator Remarks"}
            defaultValue={data?.sales_co_remarks}
            disable={true}
          />

          <BasicTextFields
            lable={"GR number"}
            defaultValue={data?.gr_number}
            disable={true}
          />
          <DatePicker
            label={"GR Date"}
            defaultDate={data.gr_date}
            disabled={true}
          />
          <BasicTextFields
            lable={"No of boxes"}
            defaultValue={data?.boxes}
            disable={true}
          />

          <BasicTextFields
            lable={"Transporter name"}
            disable={true}
            defaultValue={data?.transporter_name}
          />
        </div>
        <div className="w-full flex gap-4 mt-8">
          <div onClick={rejectReturn}>
            <BasicButton size={"small"} text={"Reject"} />
          </div>
          <div onClick={formik.handleSubmit}>
            <BasicButton size={"small"} text={"Approve"} />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default AllReturnWarehouse;

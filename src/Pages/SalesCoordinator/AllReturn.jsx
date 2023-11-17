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
import UploadButton from "../../Components/Material/UploadButton";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BasicTextFields from "../../Components/Material/TextField";
import { useFormik } from "formik";
import DatePicker from "../../Components/Material/Date";

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
              return !item.sales_co_status ? (
                <ReturnDetails data={item} setLoading={setLoading} />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const handleDate = (date) => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = (months.indexOf(date.split(" ")[1]) + 1)
    .toString()
    .padStart(2, "0");
  let modifiedDate = `${date.split(" ")[3]}-${month}-${date.split(" ")[2]}`;

  return modifiedDate;
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
      transporterName: "",
    },
    validate: (values) => {
      const errors = {};
      let qtyError = false;

      for (let i = 0; i < values.items.length; i++) {
        const item = values.items[i];
        if (
          item.recievedQty === 0 ||
          item.damageQty === 0 ||
          item.defective === 0
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
      } else if (
        !values.remarks ||
        !values.grDate ||
        !values.grNumber ||
        !values.numOfBoxes ||
        !values.transporterName
      ) {
        ShowError("Please fill all the fields");
        errors.remarks = "Required";
        return errors;
      }
    },
    onSubmit: async (values) => {
      setLoading(true);
      // updating return
      const res = await instance({
        url: `sales_data/update-return-sales-coordinator`,
        method: "PUT",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
        data: {
          id: data.id,
          remarks: values.remarks,
          grNumber: values.grNumber,
          grDate: values.grDate,
          numberOfBoxes: values.numOfBoxes,
          transporterName: values.transporterName,
          items: values.items.map((item) => {
            return {
              id: item.id,
              receivedQuantity: Number(item.recievedQty),
              damagedQuantity: Number(item.damageQty),
              defectiveQuantity: Number(item.defective),
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
          url: `sales_data/submit-return-sales-coordinator/${data.id}`,
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
      res.data.data.return_processing_items.map((item) => {
        formik.values.items.push({
          ...item,
          recievedQty: 0,
          damageQty: 0,
          defective: 0,
        });
        formik.values.grNumber = res.data.data.gr_number;
        formik.values.grDate = res.data.data.gr_date;
        formik.values.numOfBoxes = res.data.data.boxes;
        formik.values.transporterName = res.data.data.transporter_name;
      });
      setItems(res.data.data.return_processing_items);
    }
  };

  const alterQuantity = (id, type, value) => {
    formik.values.items.forEach((item) => {
      if (item.id === id) {
        item[type] = value;
      }
    });
  };

  const rejectReturn = async () => {
    setLoading(true);
    if (!formik.values.remarks) {
      ShowError("Please add remarks");
    } else {
      const res = await instance({
        url: `sales_data/reject-return-sales-coordinator`,
        method: "PUT",
        data: {
          id: data.id,
          remarks: `REJECTED! ${formik.values.remarks}`,
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
                            onChange={(e) => {
                              alterQuantity(
                                item.id,
                                "recievedQty",
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
                            onChange={(e) => {
                              alterQuantity(
                                item.id,
                                "damageQty",
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
                            onChange={(e) => {
                              alterQuantity(
                                item.id,
                                "defective",
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
        <div className="w-full flex gap-4 mt-8">
          <BasicTextFields
            lable={"Remarks"}
            handleOrderProcessingForm={(value) => {
              formik.values.remarks = value;
            }}
          />
          <BasicTextFields
            lable={"GR number"}
            defaultValue={data?.gr_number}
            handleOrderProcessingForm={(value) => {
              formik.values.grNumber = value;
            }}
          />
          <DatePicker
            defaultDate={data.gr_date}
            handleOrderProcessingForm={(value) => {
              const newDate = handleDate(value.toString());
              formik.values.grDate = newDate;
            }}
          />
          <BasicTextFields
            lable={"No of boxes"}
            defaultValue={data?.boxes}
            handleOrderProcessingForm={(value) =>
              (formik.values.numOfBoxes = value)
            }
          />

          <BasicTextFields
            lable={"Transporter name"}
            defaultValue={data?.transporter_name}
            handleOrderProcessingForm={(value) => {
              formik.values.transporterName = value;
            }}
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

export default AllReturn;

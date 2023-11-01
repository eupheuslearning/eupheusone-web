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
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import UploadButton from "../../Components/Material/UploadButton";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
              return (
                // <div className="flex flex-col gap-2">
                //   <div
                //     key={index}
                //     className="flex font-medium flex-wrap gap-4 text-gray-100 justify-start rounded-md items-start px-4 py-4 bg-slate-600"
                //   >
                //     <span>Return Type: {item.return_type}</span>
                //     <span>Return Reference: {item.return_ref}</span>
                //     <span>School Code: {item.school_code}</span>
                //     <span>School Name: {item.fk_school.school_name}</span>
                //     <span>Sales Order Date: {item.sales_order_date}</span>
                //     <span>Return Date: {item.return_date}</span>
                //   </div>
                //   <div className="flex gap-2">
                //     <div onClick={() => getPrint(item?.id)}>
                //       <BasicButton size={"small"} text={"Get Print"} />
                //     </div>

                //     {!item.is_final ? (
                //       <UploadButton
                //         name={"Upload Attachment"}
                //         accept={"image/*"}
                //         uploadContent={uploadAttachment}
                //         id={item.id}
                //       />
                //     ) : null}
                //     {!item.is_final && item.attachment ? (
                //       <div onClick={() => SubmitReturn(item?.id)}>
                //         <BasicButton size={"small"} text={"Submit"} />
                //       </div>
                //     ) : null}
                //     {/* {item.is_final ? (
                //       <BasicButton size={"small"} text={"Copy to Sap"} />
                //     ) : null} */}
                //   </div>
                // </div>
                <ReturnDetails data={item} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ReturnDetails = ({ data }) => {
  const [expanded, setExpended] = useState(false);
  return (
    <Accordion
      expanded={expanded}
      className="!bg-slate-500"
      onChange={() => {
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
              {/* {rowData.map((item, index) => {
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
                              <TableCell align="left">
                                <Remove
                                  className="!mr-2 !bg-slate-500 !rounded-full !text-white !cursor-pointer"
                                  onClick={() => {
                                    removeItemRow(item.id);
                                  }}
                                />
                                {item.item_name}
                              </TableCell>
                              <TableCell align="center">
                                {item.item_code}
                              </TableCell>
                              <TableCell align="center">
                                {item?.inv_no}
                              </TableCell>
                              <TableCell align="center">
                                {item?.docdate}
                              </TableCell>
                              <TableCell align="center">
                                {item?.series}
                              </TableCell>

                              <TableCell align="center">
                                {item?.price}
                              </TableCell>

                              <TableCell align="center">
                                {item?.grade}
                              </TableCell>
                              <TableCell align="center">
                                <TextField
                                  id="search-bar"
                                  type={"number"}
                                  className="text_black"
                                  onChange={(e) => {
                                    alterItemQuantity(index, e.target.value);
                                  }}
                                  label="Enter Value *"
                                  variant="outlined"
                                  defaultValue={item?.quantity}
                                  size="small"
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        );
                      })} */}
            </Table>
          </TableContainer>
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
};

export default AllReturn;

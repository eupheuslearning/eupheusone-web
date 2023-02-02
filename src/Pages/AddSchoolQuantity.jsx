import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
// import { Add } from '@mui/icons-material'
import { Link, useNavigate, useParams } from "react-router-dom";
import DataTable from "../Components/DataTable";
// import { rows, ManageSchoolRows } from '../DummyData'
import SearchDropDown from "../Components/SearchDropDown";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import instance from "../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import BasicButton from "../Components/Material/Button";
import { Backdrop, CircularProgress, Toolbar } from "@mui/material";
import * as XLSX from "xlsx";
import Snackbars from "../Components/Material/SnackBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import TablePagination from "@mui/material/TablePagination";
import DialogSlide from "../Components/Material/Dialog4";
import DialogSlide2 from "../Components/Material/Dialog3";

const AddSchoolQuantity = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("invoice");
  const [loading, setLoading] = useState(false);
  const [stateAndCity, setStateAndCity] = useState({ state: "", city: "" });
  const sidebarRef = useRef();
  const [states, setStates] = useState([]);
  const [city, setCity] = useState({ disable: true });
  const [schoolList, setSchoolList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [invoiceData, setInvoiceData] = useState([]);
  const [rowdata, setRowdata] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [searchRow, setSearchRow] = useState([]);
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceId2, setInvoiceId2] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [editQuantity, setEditQuantity] = useState(false);
  const navigate = useNavigate();

  const navInfo = {
    title: "Invoice",
    details: ["Home", " / Invoice"],
  };
  const snackbarRef = useRef();

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  let { invoiceid } = useParams();

  const getSchoolName = async (quantity) => {
    setItems([]);
    setLoading(true);
    // console.log("firstlalalal",code)
    // let id = props.invoiceId;
    // console.log(invoiceid);
    if (quantity > 1) setEditQuantity(true);
    else setEditQuantity(false);
    // setLoading(true);
    const res = await instance({
      url: `eup_invoice/geteupinvoices/${invoiceid}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    if (res.data.message) {
      //   console.log(res.data.message[0].eup_invoice_items);
      let dataArr = res.data.message[0].eup_invoice_items;
      let k = 1;
      let tempData = [];
      for (let i = 0; i < dataArr.length; i++) {
        // console.log(dataArr[i])
        // console.log(quantity)
        for (let j = 0; j < quantity; j++) {
          let tempArr = [dataArr[i], k, -1, -1];
          tempData.push(tempArr);
          k++;
        }
      }

      console.log(tempData);
      setItems(tempData);
      setLoading(false);
      //   handleProjectionForm(res.data.message, "School Name");
    }
    // setShowTable(true)
    // setLoading(false);
  };

  const getSchoolId = async () => {
    // setLoading(true);

    const res = await instance({
      url: `school/get/school/state_with_crm`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    if (res.data.message) {
      // console.log(res.data.message);
      setSchoolList(res.data.message);

      //   console.log(tempData)
      //   setItems(tempData);
      //   handleProjectionForm(res.data.message, "School Name");
    }
    // setShowTable(true)
    // setLoading(false);
  };

  useEffect(() => {
    getSchoolId();
    const userType = Cookies.get("type");
    if (userType === "admin") setIsAdmin(true);

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

  const handleOrderProcessingForm = (value, type, id) => {
    // console.log(value, type, id);
    if (editQuantity === false) {
      for (let ele of items) {
        ele[ele.length - 2] = value.id;
      }
    } else {
      for (let ele of items) {
        if (ele[1] === id) {
          ele[ele.length - 2] = value.id;
        }
      }
    }
    // console.log(items);
  };

  const handleQuantity = (quant, tempid) => {
    // console.log(quant, tempid, originalData);
    // console.log(quant.length)
    if (quant.length === 0) quant = -1;
    for (let ele of items) {
      if (ele[1] === tempid) {
        // console.log(ele);
        ele[ele.length - 1] = parseInt(quant);
      }
    }
    // console.log(items);
  };

  const handleDataSubmit = async () => {
    // console.log(items);
    setLoading(true);
    let postArr = [];
    let postObj = {};
    for (let arr of items) {
      let quant = 0;
      if (editQuantity) {
        quant = arr[3];
        // console.log(quant)
        if (quant < 0) {
          setSnackbarErrStatus(true);
          setSnackbarMsg("All Fields are Mandatory");
          snackbarRef.current.openSnackbar();
          //   alert("All Fields are Mandatory");
          setLoading(false);
          return;
        }
      } else quant = arr[0].quantity;
      // console.log(editQuantity)
      let schl = arr[2];
      if (schl === -1) {
        setSnackbarErrStatus(true);
        setSnackbarMsg("All Fields are Mandatory");
        snackbarRef.current.openSnackbar();
        // alert("All Fields are Mandatory");
        setLoading(false);
        return;
      }
      let tempObj = {
        itemcode: arr[0].itemcode,
        itemdescription: arr[0].itemdescription,
        school: arr[2],
        quantity: quant,
      };
      postArr.push(tempObj);
    }
    postObj = {
      invoice: invoiceid,
      items: postArr,
    };
    // console.log(postObj)
    const res = await instance({
      url: `eup_invoice/tag_eupheus_invoice_school`,
      method: "POST",
      data: postObj,
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    console.log(res);
    if (res.data.status === "success") {
      setSnackbarErrStatus(false);
      setSnackbarMsg(res.data.message);
      snackbarRef.current.openSnackbar();
      //   alert("Data Saved Successfull");
      setEditQuantity(true);
      setTimeout(() => {
        setItems([]);
        navigate(`/invoice`);
      }, 1500);
      //   navigate(`/invoice`)
    } else {
      setSnackbarErrStatus(true);
      setSnackbarMsg(res.data.message);
      snackbarRef.current.openSnackbar();
    }
    setLoading(false);
  };

  return (
    <div>
      <Snackbars
        ref={snackbarRef}
        snackbarErrStatus={snackbarErrStatus}
        errMessage={snackbarMsg}
      />
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
          <div className="min-h-[100vh] pt-[0vh] max-h-full bg-[#141728]">
            <div className=" sm:px-8 px-2 py-3 bg-[#141728]">
              <Paper>
                <TableContainer component={Paper}>
                  <Toolbar className="bg-slate-500 !flex justify-between">
                    {/* <div className="!flex justify-between"> */}
                    <div>
                      <TextField
                        required={true}
                        label="Enter School Qantity:"
                        variant="standard"
                        type={"number"}
                        disabled={false}
                        defaultValue="0"
                        InputLabelProps={{ style: { color: "white" } }}
                        onBlur={(event) => {
                          getSchoolName(event.target.value);
                          // console.log(event.target.value);
                        }}
                      />
                    </div>

                    <div className="w-[30vw]">
                      {editQuantity === false ? (
                        <SearchDropDown
                          //   seriesId={row[1]}
                          Name={"select_school_id"}
                          handleOrderProcessingForm={handleOrderProcessingForm}
                          data={schoolList}
                          label={"Select School *"}
                          //   color={"rgb(243, 244, 246)"}
                        />
                      ) : (
                        ""
                      )}
                    </div>

                    <div
                      className="sm:w-auto w-[50vw]"
                      onClick={() => {
                        handleDataSubmit();
                      }}
                    >
                      <BasicButton text={"Submit Data"} />
                    </div>
                    {/* </div> */}
                  </Toolbar>

                  <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead className="bg-slate-600">
                      <TableRow>
                        <TableCell className="!w-[5rem]" align="center">
                          Invoice No
                        </TableCell>
                        <TableCell className="!w-[20rem]" align="center">
                          Item Name
                        </TableCell>
                        {editQuantity ? (
                          <TableCell className="!w-[20rem]" align="center">
                            Schools
                          </TableCell>
                        ) : (
                          ""
                        )}
                        {editQuantity ? (
                          <TableCell className="!w-[7rem]" align="center">
                            Total Quantity
                          </TableCell>
                        ) : (
                          ""
                        )}
                        <TableCell className="!w-[8rem]" align="center">
                          Quantity
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="bg-slate-400">
                      {items.map((row) => (
                        <TableRow
                          key={row.series}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell align="center">
                            {row[0].itemcode}
                          </TableCell>
                          <TableCell align="center">
                            {row[0].itemdescription}
                          </TableCell>
                          {editQuantity ? (
                            <TableCell align="center">
                              <SearchDropDown
                                seriesId={row[1]}
                                Name={"select_school_id"}
                                handleOrderProcessingForm={
                                  handleOrderProcessingForm
                                }
                                data={schoolList}
                                label={"Select School *"}
                                // color={"rgb(128, 128, 128)"}
                              />
                            </TableCell>
                          ) : (
                            ""
                          )}

                          {editQuantity ? (
                            <TableCell align="center">
                              {row[0].quantity}
                            </TableCell>
                          ) : (
                            ""
                          )}

                          <TableCell align="center">
                            {editQuantity ? (
                              <TextField
                                id="search-bar"
                                className="text"
                                type={"number"}
                                onInput={(e) => {
                                  handleQuantity(e.target.value, row[1]);
                                }}
                                label="Enter Value *"
                                variant="outlined"
                                //   placeholder="Quantity"
                                size="small"
                              />
                            ) : (
                              row[0].quantity
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchoolQuantity;

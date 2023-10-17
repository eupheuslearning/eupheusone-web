import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
// import { Add } from '@mui/icons-material'
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../Components/DataTable";
// import { rows, ManageSchoolRows } from '../DummyData'
import SearchDropDown from "../Components/SearchDropDown";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar4";
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

const AdminInvoice = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("invoice");
  const [loading, setLoading] = useState(false);
  const [stateAndCity, setStateAndCity] = useState({ state: "", city: "" });
  const sidebarRef = useRef();
  const [states, setStates] = useState([]);
  const [city, setCity] = useState({ disable: true });
  const [schoolRow, setSchoolRow] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [invoiceData, setInvoiceData] = useState([]);
  const [rowdata, setRowdata] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [searchRow, setSearchRow] = useState([]);
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceId2, setInvoiceId2] = useState("");
  const [bpCode, setbpCode] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [customer, setCustomer] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [fkUserId, setfkUserId] = useState("");

  const navigate = useNavigate();

  const navInfo = {
    title: "Invoice",
    details: ["Admin", " / Invoice"],
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  const filterTable = () => {
    // console.log(searchVal);
    // console.log(rowdata)
    setPage(0);
    let tempArr = [];
    for (let ele of rowdata) {
      //   console.log(ele)
      let invNo = ele.inv_no.toLowerCase();
      let customerName = ele.cardname.toLowerCase();
      let docDate = ele.docdate;
      if (
        customerName.indexOf(searchVal.toLowerCase()) > -1 ||
        invNo.indexOf(searchVal.toLowerCase()) > -1 ||
        docDate.indexOf(searchVal) > -1
      ) {
        tempArr.push(ele);
      }
    }
    setSearchRow([]);
    if (tempArr.length === 0) {
      alert("No data Found");
      // setSearchRow([
      //   {
      //     docnum: null,
      //     docdate: null,
      //     docdate: null,
      //     doctotal: null,
      //     id: null,
      //   },
      // ]);
    } else {
      setSearchRow(tempArr);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (val) => {
    setSearchVal(val.trim());
  };

  const handleSchoolAdd = (invceId) => {
    // console.log(invceId)
    // setInvoiceId(invceId);
    // openDialogue();
    navigate(`/admin/addschoolquantity/${invceId}`);
  };

  const handleInvoiceView = (invceId) => {
    console.log(invceId);
    // setInvoiceId2(invceId);
    // openDialogue();
    navigate(`/admin/invoice_item/${invceId}`);
  };

  const dialogRef = useRef();
  // const dialogRef2 = useRef();

  const openDialogue = () => {
    // console.log(id)
    dialogRef.current.openDialog();
  };

  // const openDialogue2 = () => {
  //   dialogRef2.current.openDialog();
  // };

  useEffect(() => {
    getAllUser();
    // getCustomers();
    // getInvoices();
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

  const getInvoices = async () => {
    setLoading(true);
    const res = await instance({
      url: `eup_invoice/geteupinvoices/`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    // console.log(res.data.message);
    setInvoiceData(res.data.message);
    setRowdata(res.data.message);
    setLoading(false);
  };

  const getSchoolByState = async (id) => {
    setLoading(true);

    const res = await instance({
      url: `school/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    const rows = res.data.message.map((item, index) => {
      return {
        id: item.id,
        SchoolName: item.school_name,
        State: item.school_addresses[0].fk_state.state,
        Address: item.school_addresses[0].address,
      };
    });
    setSchoolRow(rows);
    setLoading(false);
  };

  const getAllUser = async () => {
    const res = await instance({
      url: "user/getuserids",
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    // console.log(res.data.message);
    // setCustomer(res.data.message);
    setAllUser(res.data.message);
  };

  const handleOrderProcessingForm = async (value, type) => {
    // console.log(value,type)
    switch (type) {
      case "select_state":
        getCity(value.fk_state_id);
        getSchoolByState(value.fk_state_id);
        setStateAndCity({ ...stateAndCity, state: value.fk_state_id });
        break;
      case "select_city":
        setStateAndCity({ ...stateAndCity, city: value.id });
        break;
      case "invoice_data":
        // console.log(value.bp_user_taggings[0])
        setbpCode(value.bp_code);
        setfkUserId(value.bp_user_taggings[0].fk_user_id);
        break;
      case "get_all_user":
        console.log(value);
        getCustomers(value.id);
        // setbpCode(value.bp_code);
        break;
      default:
        break;
    }
  };

  const getCustomers = async (id) => {
    const res = await instance({
      url: `user/admin/get/customers/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    console.log(res.data.message);
    setCustomer(res.data.message);
  };

  const searchInvoice = async () => {
    console.log(bpCode);
    console.log(fkUserId);
    let dataToPost = {
      fk_user_id: fkUserId,
      bpcode: bpCode,
    };
    setLoading(true);
    const res = await instance({
      url: `user/admin/get/customers/invoices/list`,
      method: "POST",
      data: dataToPost,
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    console.log(res.data);
    if (res.data.status === "error") {
      alert(res.data.message);
    } else {
      setInvoiceData(res.data.message);
      setRowdata(res.data.message);
    }
    setLoading(false);
  };

  const getCity = async (Id) => {
    setLoading(true);
    const res = await instance({
      url: `location/city/${Id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setCity(res.data.message);
    setLoading(false);
  };

  useLayoutEffect(() => {
    const getStates = async () => {
      const res = await instance({
        url: "location/state/get/states",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });

      setStates(res.data.message);
    };
  }, []);

  const snackbarRef = useRef();

  return (
    <div>
      {/* <DialogSlide ref={dialogRef} invoiceId={invoiceId2} /> */}

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
                  <Toolbar className="grid grid-cols-2 grid-rows-2 md:flex md:justify-around md:items-center px-6 py-3 gap-6 bg-slate-500">
                    {/* <div className="sm:w-auto w-full"> */}
                    <div className="sm:col-span-3 w-[50%]">
                      <SearchDropDown
                        label={"Select User"}
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        color={"rgb(243, 244, 246)"}
                        data={allUser}
                        Name="get_all_user"
                      />
                    </div>

                    <div className="sm:col-span-3 w-[50%]">
                      <SearchDropDown
                        label={"Select Customer"}
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        color={"rgb(243, 244, 246)"}
                        data={customer}
                        Name="invoice_data"
                      />
                    </div>

                    <div
                      className="sm:col-span-3 w-[30%]"
                      onClick={searchInvoice}
                    >
                      <BasicButton text={"Search Invoice"} />
                    </div>
                  </Toolbar>
                  <Toolbar className="bg-slate-400">
                    <TextField
                      id="search-bar"
                      className="text"
                      onInput={(e) => {
                        handleSearch(e.target.value);
                      }}
                      label="Enter Search Value"
                      variant="outlined"
                      placeholder="Search..."
                      size="small"
                    />
                    <div className="bg-slate-300">
                      <IconButton
                        type="submit"
                        aria-label="search"
                        onClick={filterTable}
                      >
                        <SearchIcon style={{ fill: "blue" }} />
                      </IconButton>
                    </div>

                    <TablePagination
                      rowsPerPageOptions={[
                        10,
                        50,
                        100,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={3}
                      count={
                        searchRow.length === 0
                          ? rowdata.length
                          : searchRow.length
                      }
                      rowsPerPage={rowsPerPage}
                      page={page}
                      slotProps={{
                        select: {
                          "aria-label": "rows per page",
                        },
                        actions: {
                          showFirstButton: true,
                          showLastButton: true,
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Toolbar>

                  <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead className="bg-slate-500">
                      <TableRow>
                        {/* <TableCell className="!w-[5rem]" align="center">
                        Sl No
                      </TableCell> */}
                        <TableCell className="!w-[8rem]" align="center">
                          Invoice No
                        </TableCell>
                        <TableCell className="!w-[8rem]" align="center">
                          Invoice Type
                        </TableCell>
                        <TableCell className="!w-[14rem]" align="center">
                          Customer Name
                        </TableCell>
                        <TableCell className="!w-[8rem]" align="center">
                          Doc Date
                        </TableCell>
                        <TableCell className="!w-[8rem]" align="center">
                          Doc Total
                        </TableCell>
                        <TableCell className="!w-[5rem]" align="center">
                          Tag
                        </TableCell>
                        <TableCell
                          className="!w-[7rem]"
                          align="center"
                        ></TableCell>
                        <TableCell
                          className="!w-[13em]"
                          align="center"
                        ></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="bg-slate-200">
                      {searchRow.length === 0
                        ? (rowsPerPage > 0
                            ? rowdata.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : rowdata
                          ).map((row) => (
                            <TableRow
                              key={row.series}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              {/* <TableCell align="center" component="th" scope="row">
                          {row.id}
                        </TableCell> */}
                              <TableCell align="center">
                                {!row.inv_no || row.inv_no == "N/A"
                                  ? row.docnum
                                  : row.inv_no}
                              </TableCell>
                              <TableCell align="center">
                                {row.inv_type}
                              </TableCell>
                              <TableCell align="center">
                                {row.cardname}
                              </TableCell>
                              <TableCell align="center">
                                {row.docdate}
                              </TableCell>

                              <TableCell align="center">
                                {row.doctotal}
                              </TableCell>

                              <TableCell align="center">
                                {row.tag === false ? "No" : "Yes"}
                              </TableCell>

                              <TableCell align="center">
                                <div
                                  className="sm:w-auto w-[50vw]"
                                  onClick={() => {
                                    handleInvoiceView(row.id);
                                  }}
                                >
                                  <BasicButton text={"View"} />
                                </div>
                              </TableCell>

                              <TableCell align="center">
                                {row.tag === true ? (
                                  ""
                                ) : (
                                  <div
                                    className="sm:w-auto w-[50vw]"
                                    onClick={() => {
                                      handleSchoolAdd(row.id);
                                    }}
                                  >
                                    <BasicButton text={"Add School"} />
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        : (rowsPerPage > 0
                            ? searchRow.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : searchRow
                          ).map((row) => (
                            <TableRow
                              key={row.series}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              {/* <TableCell align="center" component="th" scope="row">
                          {row.id}
                        </TableCell> */}
                              <TableCell align="center">
                                {!row.inv_no || row.inv_no == "N/A"
                                  ? row.docnum
                                  : row.inv_no}
                              </TableCell>
                              <TableCell align="center">
                                {row.inv_type}
                              </TableCell>
                              <TableCell align="center">
                                {row.cardname}
                              </TableCell>
                              <TableCell align="center">
                                {row.docdate}
                              </TableCell>
                              {/* <TableCell align="center">{row.docnum}</TableCell> */}
                              <TableCell align="center">
                                {row.doctotal}
                              </TableCell>

                              <TableCell align="center">
                                {row.tag === false ? "No" : "Yes"}
                              </TableCell>

                              <TableCell align="center">
                                {/* <DialogSlide2 ref={dialogRef2}/> */}
                                {/* {row.id ? (
                                  <div
                                    className="sm:w-auto w-[50vw]"
                                    onClick={() => {
                                      handleInvoiceView(row.id);
                                    }}
                                  >
                                    <BasicButton text={"View"} />
                                  </div>
                                ) : (
                                  ""
                                )} */}
                                <div
                                  className="sm:w-auto w-[50vw]"
                                  onClick={() => {
                                    handleInvoiceView(row.id);
                                  }}
                                >
                                  <BasicButton text={"View"} />
                                </div>
                              </TableCell>
                              <TableCell align="center">
                                {/* <DialogSlide ref={dialogRef} invoiceId={row.id}/> */}
                                {/* {row.id ? (
                                  <div
                                    className="sm:w-auto w-[50vw]"
                                    onClick={() => {
                                      handleSchoolAdd(row.id);
                                    }}
                                  >
                                    <BasicButton text={"Add School"} />
                                  </div>
                                ) : (
                                  ""
                                )} */}
                                {row.tag === true ? (
                                  ""
                                ) : (
                                  <div
                                    className="sm:w-auto w-[50vw]"
                                    onClick={() => {
                                      handleSchoolAdd(row.id);
                                    }}
                                  >
                                    <BasicButton text={"Add School"} />
                                  </div>
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

export default AdminInvoice;

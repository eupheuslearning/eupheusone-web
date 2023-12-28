import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
// import { Add } from '@mui/icons-material'
import { Link, useLocation } from "react-router-dom";
import DataTable from "../Components/DataTable";
// import { rows, ManageSchoolRows } from '../DummyData'
import SearchDropDown from "../Components/SearchDropDown";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import instance from "../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import BasicButton from "../Components/Material/Button";
import { Backdrop, CircularProgress, Toolbar } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TablePagination from "@mui/material/TablePagination";
import DialogSlide2 from "../Components/Material/Dialog14";
import DialogSlide3 from "../Components/Material/Dialog16";
import ResetPass from "../Components/Material/Dialog/ResetPassDialog";

const FinanceAOF = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("aof");
  const [loading, setLoading] = useState(false);
  const [stateAndCity, setStateAndCity] = useState({ state: "", city: "" });
  const sidebarRef = useRef();
  const [states, setStates] = useState([]);
  const [city, setCity] = useState({ disable: true });
  const [rowdata, setRowdata] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchVal, setSearchVal] = useState("");
  const [aofId, setAofId] = useState("");
  const [aofId2, setAofId2] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [aadharLink, setAdharLink] = useState("");
  const [panLink, setPanLink] = useState("");
  const [gstLink, setGstLink] = useState("");
  const [cheque, setCheque] = useState([]);

  const snackbarRef = useRef();

  const navInfo = {
    title: "AOF",
    details: ["Finance", " / AOF"],
  };
  const [searchRow, setSearchRow] = useState([]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowdata.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
    getAOFdetails();
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

  const handleAofView = (invceId) => {
    console.log(invceId);
    setLoading(true);
    setAofId(invceId);
    setTimeout(() => {
      openDialogue2();
      setLoading(false);
    }, 1000);
  };

  const handleVerify = (aofId) => {
    setLoading(true);
    setAofId(aofId);
    setTimeout(() => {
      openDialogue2();
      setLoading(false);
    }, 1000);
  };

  const showDownloadPopup = (aadhar, pan, gst, cheque) => {
    setLoading(true);
    setAdharLink(aadhar);
    setPanLink(pan);
    setGstLink(gst);
    setCheque(cheque);
    // setAofId2(aofId);
    setTimeout(() => {
      openDialogue3();
      setLoading(false);
    }, 1000);
  };

  const handleAofPDF = (invId) => {
    window.open(`view_aof_pdf2/${invId}`, "_blank", "noreferrer");
  };

  const openDialogue2 = () => {
    dialogRef2.current.openDialog();
  };

  const openDialogue3 = () => {
    dialogRef3.current.openDialog();
  };

  const dialogRef2 = useRef();
  const dialogRef3 = useRef();

  const getAOFdetails = async () => {
    setLoading(true);
    const res = await instance({
      url: `/sales_data/aof/get/finance/get`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    console.log(res.data.message);
    setRowdata(res.data.message);
    setLoading(false);
  };

  const handleSync = async (id) => {
    setLoading(true);
    const res = await instance({
      url: `/sales_data/aof/sync/aof/sap/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    console.log(res);
    if (res.data.status === "success") {
      alert("Account Successfully Synced");
      // setSnackbarErrStatus(true);
      // setErrMessage(res.data.message);
      // snackbarRef.current.openSnackbar();
    } else {
      alert(res.data.message);
      // setSnackbarErrStatus(false);
      // setErrMessage(res.data.message);
      // snackbarRef.current.openSnackbar();
    }
    setLoading(false);
  };

  const handleSearch = (val) => {
    setSearchVal(val.trim());
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
  };

  const handleOrderProcessingForm = async (value, type) => {
    switch (type) {
      case "select_state":
        console.log(value);
        getCity(value.fk_state_id);
        getSchoolByState(value.fk_state_id);
        setStateAndCity({ ...stateAndCity, state: value.fk_state_id });
        break;
      case "select_city":
        setStateAndCity({ ...stateAndCity, city: value.id });
        break;
      default:
        break;
    }
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

  const filterTable = () => {
    setPage(0);
    let tempArr = [];
    for (let ele of rowdata) {
      let docName = ele.name.toLowerCase();
      let phone = ele.phone;
      let schlName = ele.school.toLowerCase();
      let email = ele.email.toLowerCase();
      if (
        docName.indexOf(searchVal.toLowerCase()) > -1 ||
        phone.indexOf(searchVal.toLowerCase()) > -1 ||
        schlName.indexOf(searchVal.toLowerCase()) > -1 ||
        email.indexOf(searchVal.toLowerCase()) > -1
      ) {
        tempArr.push(ele);
      }
    }
    setSearchRow([]);
    if (tempArr.length === 0) {
      alert("No data Found");
    } else {
      setSearchRow(tempArr);
    }
  };

  const sendData = (msg) => {
    console.log(msg);
    getAOFdetails();
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
      console.log(res.data.message);

      setStates(res.data.message);
    };

    const getSchoolData = async () => {
      const res = await instance({
        url: "school/b4c27059-8c42-4d35-8fe7-8dedffbfe641/294de4f3-0977-4482-b0de-2cfeaa827ba4",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      // console.log(res.data.message);
      const rows = res.data.message.map((item, index) => {
        return {
          id: item.id,
          SchoolName: item.school_name,
          State: item.school_addresses[0].fk_state.state,
          Address: item.school_addresses[0].address,
        };
      });
      // setSchoolRow(rows);
    };
  }, []);

  return (
    <div className="flex bg-[#111322]">
      <DialogSlide2 ref={dialogRef2} aofId={aofId} sendData={sendData} />
      <DialogSlide3
        ref={dialogRef3}
        adhar={aadharLink}
        pan={panLink}
        gst={gstLink}
        cheq={cheque}
      />
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
          // show={show}
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
          <div className=" sm:px-8 px-2 py-3 bg-[#141728]">
            {/* <div className="w-full flex gap-3 justify-end mt-4">
              <Link to="/aof_create">
                <BasicButton text={"Create AOF"} />
              </Link>
            </div> */}

            <Paper className="mt-5">
              <TableContainer component={Paper}>
                <Toolbar className="bg-slate-400 w-[100%]">
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
                      searchRow.length === 0 ? rowdata.length : searchRow.length
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
                      <TableCell className="!w-[12rem]" align="center">
                        Name
                      </TableCell>
                      <TableCell className="!w-[12rem]" align="center">
                        Phone
                      </TableCell>
                      <TableCell className="!w-[10rem]" align="center">
                        Email
                      </TableCell>
                      <TableCell className="!w-[8rem]" align="center">
                        Status
                      </TableCell>
                      {/* <TableCell className="!w-[6rem]" align="center">
                        ZSM Status
                      </TableCell> */}
                      <TableCell className="!w-[6rem]" align="center">
                        View
                      </TableCell>
                      <TableCell className="!w-[5rem]" align="center">
                        Download
                      </TableCell>
                      <TableCell className="!w-[6rem]" align="center">
                        Verify
                      </TableCell>
                      <TableCell className="!w-[7rem]" align="center">
                        Sync with SAP
                      </TableCell>
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
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.mobile}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">
                              {row.finance_status === true
                                ? "Approved"
                                : "Pending"}
                            </TableCell>

                            {/* <TableCell align="center">
                              {row.zms_status === true ? "Yes" : "No"}
                            </TableCell> */}

                            <TableCell align="center">
                              <div
                                className="sm:w-auto w-[50vw]"
                                onClick={() => {
                                  handleAofPDF(row.id);
                                }}
                              >
                                <BasicButton text={"View"} />
                              </div>
                            </TableCell>
                            <TableCell align="center">
                              <div
                                className="sm:w-auto w-[50vw]"
                                onClick={() => {
                                  showDownloadPopup(
                                    row.adhar_url,
                                    row.pan_url,
                                    row.gst_url,
                                    row.aof_banks
                                  );
                                }}
                              >
                                <BasicButton text={"Download"} />
                              </div>
                            </TableCell>
                            <TableCell align="center">
                              {row.finance_status === true ? (
                                ""
                              ) : (
                                <div
                                  className="sm:w-auto w-[50vw]"
                                  onClick={() => {
                                    handleVerify(row.id);
                                  }}
                                >
                                  <BasicButton text={"Verify"} />
                                </div>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {row.sap_status === true ? (
                                ""
                              ) : (
                                <div
                                  className="sm:w-auto w-[50vw]"
                                  onClick={() => {
                                    handleSync(row.id);
                                  }}
                                >
                                  <BasicButton text={"SYNC"} />
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
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.mobile}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">
                              {row.finance_status === true
                                ? "Approved"
                                : "Pending"}
                            </TableCell>

                            {/* <TableCell align="center">
                              {row.zms_status === true ? "Yes" : "No"}
                            </TableCell> */}

                            <TableCell align="center">
                              <div
                                className="sm:w-auto w-[50vw]"
                                onClick={() => {
                                  handleAofPDF(row.id);
                                }}
                              >
                                <BasicButton text={"View"} />
                              </div>
                            </TableCell>

                            <TableCell align="center">
                              <div
                                className="sm:w-auto w-[50vw]"
                                onClick={() => {
                                  showDownloadPopup(
                                    row.adhar_url,
                                    row.pan_url,
                                    row.gst_url,
                                    row.aof_banks
                                  );
                                }}
                              >
                                <BasicButton text={"Download"} />
                              </div>
                            </TableCell>

                            <TableCell align="center">
                              {row.finance_status === true ? (
                                ""
                              ) : (
                                <div
                                  className="sm:w-auto w-[50vw]"
                                  onClick={() => {
                                    handleVerify(row.id);
                                  }}
                                >
                                  <BasicButton text={"Verify"} />
                                </div>
                              )}
                            </TableCell>

                            <TableCell align="center">
                              {row.sap_status === true ? (
                                ""
                              ) : (
                                <div
                                  className="sm:w-auto w-[50vw]"
                                  onClick={() => {
                                    handleSync(row.id);
                                  }}
                                >
                                  <BasicButton text={"SYNC"} />
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    <TableRow></TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceAOF;

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchDropDown from "../Components/SearchDropDown";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import instance from "../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import BasicButton from "../Components/Material/Button";
import { Backdrop, CircularProgress } from "@mui/material";
import Slide from "@mui/material/Slide";
import DialogSlide from "../Components/Material/Dialog";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Snackbars from "../Components/Material/SnackBar";
import { Add } from "@mui/icons-material";

const Addprojection = () => {
  const [open, setOpen] = useState(false);

  const [snackbarErrStatus, setSnackbarErrStatus] = useState(false);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClose = () => {
    setOpen(false);
  };

  const openDialog = () => {
    dialogRef.current.openDialog();
  };

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("projection");
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const sidebarRef = useRef();
  const [snackbarMsg, setSnackbarMsg] = useState("Submitted SuccessFully");
  const [series, setSeries] = useState([]);
  const [rowdata, setRowdata] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [grade, setGrade] = useState([]);

  console.log(rowdata);

  const navInfo = {
    title: "Projection",
    details: ["Home", " / Projection"],
  };

  const dialogRef = useRef();

  const Tablecolumns = [
    { field: "Series", headerName: "Series", width: 300 },
    {
      field: "Grades",
      headerName: "Grades",
      width: 120,
    },
    {
      field: "MRP",
      headerName: "MRP",
      width: 400,
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      width: 400,
    },
  ];

  const getAllSeries = async (id) => {
    setLoading(true);
    const res = await instance({
      url: `projections/series/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setSeries(res.data.message);
    setLoading(false);

    console.log(res.data.message);
  };
  useLayoutEffect(() => {
    const getAllGrade = async () => {
      const res = await instance({
        url: `school/kys/classes/individuals`,
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setGrade(res.data.message);
      //   console.log(res.data.message);
    };
    getAllGrade();
  }, []);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      data: [],
    },
    validate: (values) => {
      let errors = {};
      if (values.data.length < 1) {
        errors.data = "Required";
        setSnackbarErrStatus(true);
        setSnackbarMsg("Fill The Details");
        snackbarRef.current.openSnackbar();
      }
      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      const res = await instance({
        url: `projections/create`,
        method: "post",
        data: values.data,
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setLoading(false);
      console.log(res.data);
      if (res.data.status === "success") {
        setSnackbarErrStatus(false);
        setSnackbarMsg(res.data.message);
        snackbarRef.current.openSnackbar();
        setOpen(false);
        setTimeout(() => {
          navigate("/projection");
        }, 1000);
      }
    },
  });

  const snackbarRef = useRef();

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
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

  const getSeriesPrice = async (seriesId, gradeId) => {
    setLoading(true);
    const res = await instance({
      url: `projections/series/mrp/${seriesId}/${gradeId}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    console.log(res.data);
    setLoading(false);
    return res.data;
    // return res.data.message.price;
  };

  const DuplicateRow = (row) => {
    row.mrp = 0;
    row.total = 0;
    setRowdata([...rowdata, row]);

    // console.log(row);
  };

  const handleQuantityChange = (seriesId, newValue) => {
    // console.log(seriesId, newValue);
    setRowdata(
      rowdata.map((item) => {
        if (item.id === seriesId) {
          return {
            id: item.id,
            mrp: item.mrp,
            series: item.series,
            total: item.mrp * newValue,
          };
        } else {
          return item;
        }
      })
    );
    formik.values.data = formik.values.data.map((item) => {
      if (item.fk_series_id === seriesId) {
        console.log(item);
        return {
          mrp: item.mrp,
          fk_series_id: item.fk_series_id,
          fk_grade: item.fk_grade,
          quantity: newValue,
          total: newValue * item.mrp,
        };
      } else {
        return item;
      }
    });
    // console.log(formik.values.data)
  };

  const handleProjectionForm = async (value, type, id) => {
    console.log(value, type);
    // console.log(rowdata);
    switch (type) {
      case "series_name":
        if (value.length === 0) {
          formik.values.data = [];
          setRowdata([]);
        } else {
          setLoading(true);

          setLoading(false);
          value[value.length - 1].mrp = 0;
          value[value.length - 1].total = 0;
          console.log(value);
          setRowdata([...rowdata, value[value.length - 1]]);
        }
        break;
      // case "series_name":
      //   getSeriesPrice(value.id);
      //   formik.values.series = value.id;
      //   break;
      case "grades":
        console.log(value, type, id);
        console.log(formik.values.data);
        let GradeNum = 0;
        formik.values.data.map((item) => {
          if (item.fk_series_id === id) {
            GradeNum = item.fk_grade.length;
          }
        });
        let duplicate = false;
        let res = await getSeriesPrice(id, value[value.length - 1].id);
        console.log(res);
        if (!(res?.status === "success")) {
          setSnackbarErrStatus(true);
          setSnackbarMsg("This series does match with selected grade");
          snackbarRef.current.openSnackbar();
        } else if (res.status === "success") {
          console.log(value, GradeNum);
          if (value.length > GradeNum) {
            setRowdata(
              rowdata.map((item) => {
                let quantity2;
                formik.values.data.map((item) => {
                  if (item?.fk_series_id === id) {
                    quantity2 = item?.quantity;
                  }
                });
                // console.log(quantity)
                if (item.id === id) {
                  console.log(item);
                  return {
                    id: item.id,
                    mrp: Number(item.mrp) + Number(res.message.price),
                    series: item.series,
                    total:
                      (Number(item.mrp) + Number(res.message.price)) *
                      Number(quantity2 ? quantity2 : quantity),
                  };
                } else {
                  return item;
                }
              })
            );
          } else if (value.length < GradeNum) {
            console.log("decrease");
            let gradeId = null;
            formik.values.data.map((item) => {
              if (item.fk_series_id === id) {
                item.fk_grade.map((el) => {
                  value.map((i) => {
                    if (i.id !== el.fk_grade_id) {
                      gradeId = el.fk_grade_id;
                    }
                  });
                });
              }
            });
            let res = await getSeriesPrice(id, gradeId);
            if (res.status === "success") {
              let quantity = null;
              formik.values.data.map((item) => {
                if (item.fk_series_id === id) {
                  quantity = Number(item.quantity);
                }
              });
              // console.log(quantity);
              console.log(gradeId);
              setRowdata(
                rowdata.map((item) => {
                  console.log(item);
                  if (item.id === id) {
                    return {
                      id: item.id,
                      mrp: Number(item.mrp) - Number(res.message.price),
                      series: item.series,
                      total:
                        (Number(item.mrp) - Number(res.message.price)) *
                        quantity,
                    };
                  } else {
                    return item;
                  }
                })
              );
            }
          }
        }

        formik.values.data.map((item, index) => {
          if (item.fk_series_id === id) {
            console.log("remove duplicate");
            duplicate = true;
            formik.values.data[index] = {
              fk_series_id: item.fk_series_id,
              mrp: Number(item.mrp) + Number(res.message.price),
              quantity: item.quantity,
              total:
                (Number(item.mrp) + Number(res.message.price)) *
                Number(item.quantity),
              fk_grade: value.map((item) => {
                return { fk_grade_id: item.id };
              }),
            };
          }
        });
        if (!duplicate) {
          rowdata.map((item) => {
            if (item.id === id) {
              console.log(item);
              if (res.status === "success") {
                formik.values.data.push({
                  fk_series_id: item.id,
                  quantity,
                  mrp: Number(item.mrp) + Number(res.message.price),
                  total: Number(res.message.price) * quantity,
                  fk_grade: value.map((item) => {
                    return { fk_grade_id: item.id };
                  }),
                });
              }
            }
          });
        }

        break;
      case "category":
        console.log("value= ", value, type);
        break;
      case "Quantity":
        setQuantity(value);
        setShowTable(true);
        break;
      case "publisher_name":
        setRowdata([]);
        formik.values.data = [];
        getAllSeries(value.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex bg-[#111322]">
      <DialogSlide ref={dialogRef} />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Sidebar sidebarCollapsed={sidebarCollapsed} highLight={highLight} />

      <div>
        <Snackbars
          ref={snackbarRef}
          snackbarErrStatus={snackbarErrStatus}
          errMessage={snackbarMsg}
        />
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
            <div className="w-full flex flex-col gap-4 items-center mt-[1rem]">
              <div className="flex flex-col gap-4 items-start sm:w-[100%] w-[95%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                <h1 className="text-gray-100 md:text-xl text-base font-semibold">
                  Fill The Details
                </h1>
                <div className="grid sm:grid-rows-2 sm:grid-cols-2 grid-rows-3 grid-cols-1 w-full gap-6 rounded-md bg-slate-600">
                  <SearchDropDown
                    label={"Select Publisher"}
                    color={"rgb(243, 244, 246)"}
                    data={[
                      { name: "Eupheus Learning", value: "eupheus" },
                      { name: "ClassKlap", value: "classklap" },
                    ]}
                    // multiple={true}
                    Name={"publisher_name"}
                    handleOrderProcessingForm={handleProjectionForm}
                  />

                  <SearchDropDown
                    label={"Select Series"}
                    color={"rgb(243, 244, 246)"}
                    data={series}
                    disable={series.length < 1 ? true : false}
                    multiple={true}
                    Name={"series_name"}
                    handleOrderProcessingForm={handleProjectionForm}
                  />
                  <TextField
                    label="Quantity"
                    variant="standard"
                    type={"number"}
                    // disabled={formik?.values?.series ? false : true}
                    InputLabelProps={{ style: { color: "white" } }}
                    onBlur={(newValue) =>
                      handleProjectionForm(newValue.target.value, "Quantity")
                    }
                  />
                </div>

                {showTable ? (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell className="!w-[15rem]">SERIES</TableCell>
                          <TableCell className="!w-[20rem]" align="right">
                            GRADE
                          </TableCell>
                          <TableCell className="!w-[5rem]" align="right">
                            MRP&nbsp;(Rs)
                          </TableCell>
                          <TableCell className="!w-[10rem]" align="right">
                            Quantity
                          </TableCell>
                          <TableCell className="!w-[5rem]" align="right">
                            Total
                          </TableCell>
                          {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rowdata.map((row) => (
                          <TableRow
                            key={row.series}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {/* <div
                              className="cursor-pointer"
                              onClick={() => DuplicateRow(row)}
                            >
                              <Add className="!cursor-pointer" />
                            </div> */}
                              {row.series}
                            </TableCell>
                            <TableCell align="right">
                              <SearchDropDown
                                label={"Select Grade"}
                                seriesId={row.id}
                                handleOrderProcessingForm={handleProjectionForm}
                                data={grade}
                                multiple={true}
                                Name={"grades"}
                              />
                            </TableCell>
                            <TableCell align="right">{row.mrp}</TableCell>
                            <TableCell align="right">
                              <input
                                type="number"
                                className="border-2 px-3 border-gray-500 rounded-md w-full"
                                placeholder="Enter Quantity"
                                defaultValue={quantity}
                                onBlur={(e) => {
                                  handleQuantityChange(row.id, e.target.value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">{row.total}</TableCell>
                            {/* <TableCell align="right">{row.quantity}</TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : null}

                <div onClick={formik.handleSubmit}>
                  {/* <div onClick={formik.handleSubmit}> */}
                  <BasicButton text={"Submit"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addprojection;

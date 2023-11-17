import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import SearchDropDown from "../../Components/SearchDropDown";
import { useFormik } from "formik";
import Button from "../../Components/Material/Button";
import BasicTextFields from "../../Components/Material/TextField";
import instance from "../../Instance";
import Cookies from "js-cookie";
import DatePicker from "../../Components/Material/Date";
import { Backdrop, CircularProgress, Collapse, TextField } from "@mui/material";
import Snackbars from "../../Components/Material/SnackBar";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import { protectedResources } from "../../util/msConfig";
import { getToken } from "../../util/msAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ReactGA from "react-ga4";
import { ShowError } from "../../util/showError";
import { Remove } from "@mui/icons-material";

const ReturnOrder = () => {
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("return_req");
  const [customerData, setCustomerData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [transpoterData, setTranspoterData] = useState([]);
  const [address, setAddress] = useState({ disable: true });
  const [sAddress, setSaddress] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [sCode, setSCode] = useState("");
  const sidebarRef = useRef();

  const [value, setValue] = useState({
    item_quan: true,
    total_quan: "0",
    total_before_tax: "0",
    total: "0",
  });
  const snackbarRef = useRef();
  const [rowData, setRowData] = useState([]);

  const formik = useFormik({
    initialValues: {
      return_type: "",
      full_return: true,
      sales_order_num: "",
      cutomer_name: "",
      school_code: "",
      s_address: "dfe10e18-a7d3-4063-8624-8be8820bbc88",
      b_address: "",
      order_date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`,
      returnDate: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`,
      grNum: "",
      grDate: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`,
      numOfBoxes: "",
      return_ref: "",
      bp_contact_id: "",
      school: null,
      subject: "",
      series: "",
      item_quan: "",
      items: [],
      total_quan: value.total_quan,
      total_before_tax: value.total_before_tax,
      total: value.total,
      pref_transpoter_name: "",
      remarks: "",
    },
    validate: (values) => {
      const errors = {};
      console.log(values);
      if (
        !values.return_type ||
        !values.sales_order_num ||
        !values.cutomer_name ||
        !values.school_code ||
        !values.s_address ||
        !values.b_address ||
        !values.return_ref ||
        !values.bp_contact_id ||
        !values.school ||
        !values.grNum ||
        !values.grDate ||
        !values.numOfBoxes ||
        !values.pref_transpoter_name
      ) {
        ShowError("All fields are required");
        errors.return_type = "Required";
        return errors;
      } else if (checkNegative()) {
        ShowError("Item quantity cannot be negative");
        errors.return_type = "Required";
        return errors;
      }
    },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await instance({
        url: `sales_data/createreturn`,
        method: "POST",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
        data: {
          returnType: values.return_type,
          returnReference: values.return_ref,
          salesOrderNumber: values.sales_order_num,
          salesOrderDate: values.order_date,
          returnDate: values.returnDate,
          schoolCode: values.school_code,
          bpId: values.cutomer_name,
          schoolId: values.school,
          transporterName: values.pref_transpoter_name,
          contactId: values.bp_contact_id,
          remarks: values.remarks,
          grNumber: values.grNum,
          grDate: values.grDate,
          numberOfBoxes: values.numOfBoxes,
          quantity: value.total_quan,
          amount: value.total,
          shippingAddressId: values.s_address,
          billingAddressId: values.b_address,
          isFullCancel: !values.full_return,
          items: values.items.map((item) => {
            return {
              itemId: item.id,
              quantity: item.quantity,
              itemCode: item.item_id,
              series: item.series,
              grade: item.grade,
              price: item.price,
              discountPercent: item.discount,
            };
          }),
        },
      }).catch(() => {
        setLoading(false);
        ShowError("Something went wrong");
      });
      if (res.data.status === "success") {
        setErrMessage(res.data.message);
        setSnackbarErrStatus(false);
        snackbarRef.current.openSnackbar();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      setLoading(false);
    },
  });

  const checkZeroQTY = () => {
    let err = false;

    for (let i = 0; i < formik.values.items.length; i++) {
      const item = formik.values.items[i];
      if (item.quantity === "0") {
        err = true;
        break;
      }
    }
    return err;
  };

  const navInfo = {
    title: "Return Request",
    details: ["Home", " / Return Request"],
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  const checkNegative = () => {
    let err = false;
    formik.values.items.map((item) => {
      if (Number(item.quantity) < 0) {
        err = true;
      }
    });
    return err;
  };

  const getCustomerData = async () => {
    setLoading(true);
    if (Cookies.get("ms-auth")) {
      const accessToken = await getToken(
        protectedResources.apiTodoList.scopes.read
      );
      const customerRes = await instance({
        url: "sales_data/getcustomer",
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setCustomerData(customerRes.data.message);
    } else {
      const customerRes = await instance({
        url: "sales_data/getcustomer",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      setCustomerData(customerRes.data.message);
    }
    setLoading(false);
  };

  const getSubjectData = async (category) => {
    setLoading(true);
    const SubjectRes = await instance({
      url: `subject/getfilteredsubjects/${category}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setLoading(false);
    setSubjectData(SubjectRes.data.message);
  };

  const getSchoolData = async (category) => {
    setLoading(true);
    const schoolRes = await instance({
      url: `school/get/all-schools-by-category/${category}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setSchoolData(schoolRes.data.message);
    setLoading(false);
  };

  useLayoutEffect(() => {
    const getTranspoterData = async () => {
      if (Cookies.get("ms-auth")) {
        const accessToken = await getToken(
          protectedResources.apiTodoList.scopes.read
        );
        const transpoterRes = await instance({
          url: "transporter/get",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTranspoterData(transpoterRes.data.message);
      } else {
        const transpoterRes = await instance({
          url: "transporter/get",
          method: "GET",
          headers: {
            Authorization: Cookies.get("accessToken"),
          },
        });
        setTranspoterData(transpoterRes.data.message);
      }
    };

    // getTranspoterData();
    getCustomerData();
  }, []);

  const getCustomerAddress = async (id) => {
    setLoading(true);
    const addressRes = await instance({
      url: `sales_data/getcustomer/billing/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(addressRes.data.message)
    setAddress({
      billing: JSON.parse(
        JSON.stringify(addressRes.data.message[0].bp_addresses[0])
      ),
    });

    const addressRes2 = await instance({
      url: `sales_data/getcustomer/shipping/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(.data)
    console.log(addressRes2.data.message);
    setSaddress({
      shipping: JSON.parse(
        JSON.stringify(addressRes2.data.message[0].bp_addresses)
      ),
    });

    setLoading(false);
  };

  const GetContactRes = async (id) => {
    const res = await instance({
      url: `sales_data/get/customer/contact/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setContactData(res.data.message);
  };

  const getListData = async (seriesID) => {
    setLoading(true);
    const getListData = await instance({
      url: `items/getitem/${seriesID}/${formik.values.subject.id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });

    setRowData(getListData.data.message);
    getListData.data.message.map((item) => {
      formik.values.items.push({
        id: item.id,
        item_id: item.item_code,
        quantity: formik.values.item_quan,
        price: item.price_master.price,
        tax: item.fk_tax.tax,
        discount: item.fk_discount.discount,
      });
    });
    setValue({
      item_quan: false,
      total_quan: calValues("total_quan"),
      total: calValues("total_after_tax"),
      total_before_tax: calValues("total_before_tax"),
    });
    setLoading(false);
    setOpen(true);
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

  const conditionalGetList = (id) => {
    if (!value.item_quan) {
      getListData(id);
    }
  };

  const getItemsBySoNo = async (so_no) => {
    if (rowData.length === 0 && formik.values.items.length === 0) {
      setLoading(true);
      const getListData = await instance({
        url: `items/getItemsBySo`,
        method: "POST",
        data: {
          category: formik.values.return_type.toLowerCase(),
          so_no,
          bpId: formik.values.cutomer_name,
        },
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      }).catch(() => {
        setLoading(false);
      });
      if (getListData.status === 200) {
        formik.values.sales_order_num = so_no;
        const itemsArr = [];
        formik.values.items = [];
        getListData?.data?.data?.map((subArr) => {
          subArr.map((item) => {
            if (item) {
              itemsArr.push({
                ...item,
                item_code: item.itemcode,
                item_name: item.itemdescription,
              });
              formik.values.items.push({
                id: item?.id,
                item_id: item?.itemcode,
                quantity: item?.quantity,
                price: item?.price,
                tax: 0,
                discount: item?.discountpercent,
                series: item?.series,
                grade: item?.grade,
              });
            }
          });
        });
        setRowData(itemsArr);

        setValue({
          item_quan: false,
          total_quan: calValues("total_quan"),
          total: calValues("total_after_tax"),
          total_before_tax: calValues("total_before_tax"),
        });
      }
      setLoading(false);
      setOpen(true);
    }
  };

  const handleOrderProcessingForm = async (value, type) => {
    switch (type) {
      case "order_type":
        getSubjectData(value.order_type.toLowerCase());
        getSchoolData(value.order_type.toLowerCase());
        formik.values.return_type = value.order_type;
        break;

      case "customer_name":
        getCustomerAddress(value.id);
        GetContactRes(value.id);
        formik.values.cutomer_name = value.id;
        break;
      case "Preffered Transpoter Name":
        formik.values.pref_transpoter_name = value;
        break;
      case "Sales Order Date":
        formik.values.order_date = handleDate(value.toString());
        break;
      case "contact_id":
        formik.values.bp_contact_id = value.id;
        break;
      case "Return Date":
        formik.values.returnDate = handleDate(value.toString());
        break;
      case "Return Reference":
        formik.values.return_ref = value;
        break;
      case "school_name":
        setSCode(value?.school_code);
        formik.values.school_code = value?.school_code;
        formik.values.school = value.id;
        break;

      case "series_name":
        formik.values.series = value;
        conditionalGetList(value.id);
        // getListData(value.id);
        setValue((prev) => ({ ...prev, item_quan: false }));

        break;

      case "shipping_address":
        formik.values.s_address = "dfe10e18-a7d3-4063-8624-8be8820bbc88";
        break;
      case "billing_address":
        formik.values.b_address = value.id;
        break;
      case "Total Quantity":
        formik.values.total_quan = value;
        break;
      case "Total Before Tax":
        formik.values.total_before_tax = value;
        break;
      case "Total":
        formik.values.total = value;
        break;
      case "Remarks":
        formik.values.remarks = value;
        break;
      case "partial_return":
        formik.values.full_return = value === "Yes" ? true : false;
        break;
      case "School Code":
        formik.values.school_code = value;
        break;
      case "SO No.":
        console.log(value);
        getItemsBySoNo(value);
        break;
      case "GR Number":
        formik.values.grNum = value;
        break;
      case "Number Of Boxes":
        formik.values.numOfBoxes = Number(value);
        break;
      case "GR Date":
        formik.values.grDate = handleDate(value.toString());
        break;
      default:
        break;
    }
  };

  const calValues = (type) => {
    if (type === "total_quan") {
      let total = 0;
      formik.values.items.map((item) => {
        total = total + Number(item.quantity);
      });
      return total.toString();
    }
    if (type === "total_before_tax") {
      let total = 0;
      let discount = 0;
      formik.values.items.map((item) => {
        discount =
          discount +
          (Number(item.discount) / 100) *
            Number(item.price) *
            Number(item.quantity);
        total = total + Number(item.price) * Number(item.quantity);
      });
      total = total - discount;
      return total.toString();
    }
    if (type === "total_after_tax") {
      let total = 0;
      let discount = 0;
      formik.values.items.map((item) => {
        let percentage =
          (Number(item.tax) / 100) * Number(item.price) * Number(item.quantity);
        discount =
          discount +
          (Number(item.discount) / 100) *
            Number(item.price) *
            Number(item.quantity);
        total = total + Number(item.price) * Number(item.quantity) + percentage;
      });
      // console.log(total - discount);
      // console.log(discount);
      return (total - discount).toString();
    }
  };

  const alterItemQuantity = (index, value) => {
    formik.values.items[index] = {
      id: formik.values.items[index].id,
      item_id: formik.values.items[index].item_id,
      quantity: value,
      price: formik.values.items[index].price,
      tax: formik.values.items[index].tax,
      discount: formik.values.items[index].discount,
    };
    console.log(formik.values.items);
    setValue({
      item_quan: false,
      total_quan: calValues("total_quan"),
      total: calValues("total_after_tax"),
      total_before_tax: calValues("total_before_tax"),
    });
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
    const pagePath = window.location.pathname;

    ReactGA.send({
      hitType: "pageview",
      page: pagePath,
      title: "User Page Count",
    });
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);

  const removeItemRow = (itemId) => {
    formik.values.items = formik.values.items.filter(
      (item) => item.id !== itemId
    );
    const newRowData = rowData.filter((item) => item.id !== itemId);
    setRowData(newRowData);
    setValue({
      total_quan: calValues("total_quan"),
      total: calValues("total_after_tax"),
      total_before_tax: calValues("total_before_tax"),
    });
  };

  return (
    <div className="flex">
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
        className={`flex flex-col w-[100vw] transition-all duration-300 ease-linear lg:w-[83vw] lg:ml-[18vw] ${
          window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[85vw]"
        }`}
      >
        <Snackbars
          ref={snackbarRef}
          snackbarErrStatus={snackbarErrStatus}
          errMessage={errMessage}
        />
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />
        <div className="w-full flex justify-end pr-12">
          <div className="text-red-500 w-fit rounded-md font-bold text-xl px-8 py-4 bg-gray-100">
            Under Maintenance
          </div>
        </div>
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div className=" px-2 sm:px-8 py-3 bg-[#141728]">
            <form
              // id="form"
              className="flex flex-col gap-[2rem] sm:px-6 px-4 py-6 bg-slate-600 rounded-md"
            >
              <section
                className={`grid grid-cols-1 grid-rows-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 lg:grid-rows-3 md:grid-rows-4 sm:grid-rows-5 bg-slate-600 rounded-md`}
              >
                <div className=" flex flex-col gap-2 w-full">
                  <SearchDropDown
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    data={[
                      { order_type: "Eupheus" },
                      { order_type: "Classklap" },
                    ]}
                    Name={"order_type"}
                    label={"Return Type"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <SearchDropDown
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  defaultValue={formik.values.full_return ? "Yes" : "No"}
                  data={["Yes", "No"]}
                  Name={"partial_return"}
                  label={"Full Return"}
                  color={"rgb(243, 244, 246)"}
                />

                <div className=" flex flex-col gap-2 w-full">
                  <SearchDropDown
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    data={customerData}
                    Name="customer_name"
                    label={"Customer Name"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  <TextField
                    id="search-bar"
                    label="Shipping Address"
                    variant="standard"
                    InputLabelProps={{ style: { color: "white" } }}
                    inputProps={{ style: { color: "white" } }}
                    value={"Greater Noida warehouse"}
                    size="small"
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  <SearchDropDown
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    disable={address.disable}
                    data={[address.billing]}
                    Name={"billing_address"}
                    label={"Billing Address"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  <SearchDropDown
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    disable={address.disable}
                    data={contactData}
                    Name={"contact_id"}
                    label={"Select Contact"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>

                <div className=" flex flex-col gap-2 w-full">
                  <DatePicker
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    label={"Sales Order Date"}
                    disablePast={false}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  <DatePicker
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    label={"Return Date"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  <DatePicker
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    label={"GR Date"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  <AlphaNumericTextField
                    handleOrderProcessingForm={handleOrderProcessingForm}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  <BasicTextFields
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    lable={"Number Of Boxes"}
                    variant={"standard"}
                    type={"number"}
                    multiline={false}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  <BasicTextFields
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    lable={"Return Reference"}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  <SearchDropDown
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    data={schoolData}
                    disable={schoolData.length > 0 ? false : true}
                    Name={"school_name"}
                    label={"Select School"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  <TextField
                    id="search-bar"
                    label="School Code"
                    variant="standard"
                    InputLabelProps={{ style: { color: "white" } }}
                    inputProps={{ style: { color: "white" } }}
                    disabled={!formik.values.school_code}
                    value={sCode}
                    size="small"
                  />
                </div>

                <div className=" flex flex-col gap-2 w-full">
                  <TextField
                    id="standard-basic"
                    onBlur={(e) =>
                      handleOrderProcessingForm(e.target.value, "SO No.")
                    }
                    inputProps={{ style: { color: "white" } }}
                    disabled={
                      !formik.values.return_type || !formik.values.cutomer_name
                    }
                    InputLabelProps={{ style: { color: "white" } }}
                    label="Sales Order No"
                    variant="standard"
                  />
                </div>
              </section>
              <Collapse in={open}>
                <Paper>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
                      <TableHead className="bg-slate-400">
                        <TableRow>
                          <TableCell className="!w-[15rem]" align="center">
                            Item Name
                          </TableCell>
                          <TableCell className="!w-[15rem]" align="center">
                            Item Code
                          </TableCell>
                          <TableCell className="!w-[15rem]" align="center">
                            Invoice No.
                          </TableCell>
                          <TableCell className="!w-[15rem]" align="center">
                            Invoice Date
                          </TableCell>

                          <TableCell className="!w-[8rem]" align="center">
                            Series Name
                          </TableCell>

                          <TableCell className="!w-[8rem]" align="center">
                            Price
                          </TableCell>

                          <TableCell className="!w-[8rem]" align="center">
                            Grade
                          </TableCell>
                          <TableCell className="!w-[10rem]" align="center">
                            Quantity
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      {rowData.map((item, index) => {
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
                      })}
                    </Table>
                  </TableContainer>
                </Paper>
              </Collapse>
              <div className="grid grid-cols-1 grid-rows-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 lg:grid-rows-1 md:grid-rows-2 sm:grid-rows-3 bg-slate-600 rounded-md">
                <div className=" flex flex-col gap-2 w-full">
                  <BasicTextFields
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    lable={"Total Quantity"}
                    readOnly={true}
                    defaultValue={value.total_quan}
                    value={value.total_quan}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  <BasicTextFields
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    lable={"Total Before Tax"}
                    defaultValue={Math.round(value.total_before_tax)}
                    value={Math.round(value.total_before_tax)}
                    readOnly={true}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  <BasicTextFields
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    lable={"Total"}
                    readOnly={true}
                    defaultValue={Math.round(value.total)}
                    value={Math.round(value.total)}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
              </div>
              <div className="flex sm:flex-row flex-col items-center gap-[2rem] justify-between">
                <div className=" flex flex-col gap-2 w-full">
                  <BasicTextFields
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    lable={"Preffered Transpoter Name"}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
                {/* <div className=" flex flex-col gap-2 w-full">
                  <BasicTextFields
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    lable={"Preffered Transpoter Name"}
                    variant={"standard"}
                    multiline={false}
                  />
                </div> */}
                <div className=" flex flex-col gap-2 w-full md:col-span-2">
                  <BasicTextFields
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    lable={"Remarks"}
                    multiline={true}
                  />
                </div>
              </div>
              <div onClick={formik.handleSubmit}>
                <Button text={"Save for print"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const AlphaNumericTextField = ({ handleOrderProcessingForm }) => {
  const [value, setValue] = useState("");
  let aplhaNumericRegex = /^[a-zA-Z0-9]+$/;
  return (
    <TextField
      id="standard-basic"
      onChange={(e) => {
        if (e.target.value === "" || aplhaNumericRegex.test(e.target.value)) {
          setValue(e.target.value);
          handleOrderProcessingForm(e.target.value, "GR Number");
        }
      }}
      inputProps={{ style: { color: "white" } }}
      value={value}
      InputLabelProps={{ style: { color: "white" } }}
      label="GR Number"
      variant="standard"
    />
  );
};

export default ReturnOrder;

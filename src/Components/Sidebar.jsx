import React, { useEffect, useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  Place,
  School,
  // AccountBalance,
  // KeyboardArrowDown,
  // Circle,
  Dashboard,
  // LocationOn,
  LocalShipping,
  LocationCityOutlined,
  ShoppingBag,
  // ListAlt,
  // LocationCity,
  // AssignmentReturnOutlined,
  ReceiptOutlined,
  PrintOutlined,
  Timeline,
  AddTask,
  CurrencyRupee,
  Money,
  KeyboardReturn,
  ManageSearch,
  Discount,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import logoLight from "../assets/img/logo-light-icon.png";
// import { Collapse } from "@mui/material";
// import Divider from "@mui/material/Divider";
import { useLayoutEffect } from "react";
import instance from "../Instance";
import Cookies from "js-cookie";
import { getToken } from "../util/msAuth";
import { protectedResources } from "../util/msConfig";
import TransitionsModal from "./Material/Model";
import DialogSlide from "./Material/Dialog";
import { useRef } from "react";
import ResetPass from "./Material/Dialog/ResetPassDialog";
import AdminSidebar from "./Sidebar/AdminSidebar";

const Sidebar = ({ sidebarCollapsed, highLight, show }) => {
  const [modelOpen, setModelOpen] = useState(false);
  const [isSchoolClicked, setIsSchoolClicked] = useState(
    show === 2 ? false : true
  );
  const [isSchoolDetailClicked, setIsSchoolDetailClicked] = useState(
    show === 2 ? true : false
  );
  const [user, setUser] = useState({});
  const [userType, setUserType] = useState();
  const [openReset, setOpenReset] = useState(false);
  const [isZsmLogin, setIsZsmLogin] = useState(false);

  const dialogRef = useRef();

  useEffect(() => {
    if (Cookies.get("type") === "zsm") {
      setIsZsmLogin(true);
    }
    const userlogintype = Cookies.get("type");
    setUserType(userlogintype);
    if (show === null) {
      setIsSchoolClicked(false);
      setIsSchoolDetailClicked(false);
    }
  }, []);

  useLayoutEffect(() => {
    const getUser = async () => {
      if (Cookies.get("ms-auth")) {
        const accessToken = await getToken(
          protectedResources.apiTodoList.scopes.read
        );
        const res = await instance({
          url: "user/profile",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(res.data.message);
      } else {
        const res = await instance({
          url: "user/profile",
          method: "GET",
          headers: {
            Authorization: `${Cookies.get("accessToken")}`,
          },
        }).catch((err) => {
          if (err.response.status === 401 || err.response.status === 403) {
            if ((err.response.data.message = "you need to change password")) {
              setOpenReset(true);
            } else {
              setModelOpen(true);
            }
          }
        });
        setUser(res.data.message);
      }
    };
    getUser();
  }, []);

  const roleSidebarArr = {
    user: [
      {
        name: "Dashboard",
        icon: <Dashboard />,
        path: "/",
        highLight: "dashboard",
      },
    ],
  };

  const openDialog = () => {
    dialogRef.current.openDialog();
  };

  return (
    <div
      className={`fixed transition-all h-[100vh] ease-linear duration-300 ${
        window.innerWidth < 1024 ? "-left-[100%]" : "left-[0%]"
      } lg:py-2 md:py-4 py-8 z-[100] w-[85vw] lg:w-[18vw] md:w-[30vw] bg-[#111322] h-[100vh] overflow-auto !font-Roboto`}
    >
      {openReset ? <ResetPass /> : null}
      <TransitionsModal open={modelOpen} />;
      <DialogSlide ref={dialogRef} />
      <div
        className={`flex flex-col gap-4 transition-all ease-linear duration-100 font-Roboto`}
      >
        <div className="flex items-center gap-3 justify-center">
          <img
            src={logoLight}
            className=" w-[10vw] md:w-[3.7vw] h-auto object-cover"
            alt=""
          />
          <h4 className="text-gray-100 lg:text-2xl">Eupheus Learning</h4>
        </div>
        <aside className="flex flex-col px-6 text-gray-200">
          <span className="text-lg">Hi, {user.first_name}</span>
          <span className="text-sm text-gray-300">{user.emp_id}</span>
          <hr className="text-gray-100 mt-4" />
        </aside>
        {userType === "training" ? (
          <>
            <Link to="/manageSchoolTraining">
              <aside
                className={`px-6 py-2 flex gap-4 cursor-pointer ${
                  highLight === "manageSchool" ? "bg-gray-500" : ""
                } group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <School
                  className={`${
                    highLight === "manageSchool"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "manageSchool"
                      ? "text-gray-200"
                      : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Manage School
                </span>
              </aside>
            </Link>

            <Link to="/invoice_training">
              <aside
                className={`px-6 py-2 flex gap-4 ${
                  highLight === "invoice" ? "bg-gray-500" : ""
                } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <ReceiptOutlined
                  className={`${
                    highLight === "invoice"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "invoice" ? "text-gray-200" : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Invoice Tagging
                </span>
              </aside>
            </Link>

            <Link to="/locationTraining">
              <aside
                className={`px-6 py-2 flex gap-4 cursor-pointer ${
                  highLight === "location" ? "bg-gray-500" : ""
                } group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <Place
                  className={`${
                    highLight === "location"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "location" ? "text-gray-200" : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Location
                </span>
              </aside>
            </Link>

            <Link to="/ck_school_training">
              <aside
                className={`px-6 py-2 flex gap-4 cursor-pointer ${
                  highLight === "ckSchool" ? "bg-gray-500" : ""
                } group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <School
                  className={`${
                    highLight === "ckSchool"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "ckSchool" ? "text-gray-200" : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  CK Schools
                </span>
              </aside>
            </Link>

            <Link to="/order_training">
              <aside
                className={`px-6 py-2 flex gap-4 cursor-pointer ${
                  highLight === "order" ? "bg-gray-500" : ""
                } group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <ReceiptOutlined
                  className={`${
                    highLight === "order" ? "!text-[#659DBD]" : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "order" ? "text-gray-200" : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Order Tagging
                </span>
              </aside>
            </Link>
          </>
        ) : null}

        {userType === "finance" ? (
          <>
            <Link to="/finance/aof">
              <aside
                className={`px-6 py-2 hover:bg-gray-500 flex ${
                  highLight === "aof" ? "bg-gray-500" : ""
                } rounded-md gap-4 cursor-pointer group`}
              >
                <div className="flex gap-4">
                  <Dashboard
                    className={`${
                      highLight === "aof" ? "!text-[#659DBD]" : "!text-gray-400"
                    } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                  />
                  <span
                    className={`${
                      highLight === "aof" ? "text-gray-200" : "text-gray-400"
                    } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                  >
                    AOF
                  </span>
                </div>
                {/* <hr className="text-gray-300" /> */}
              </aside>
            </Link>
            <Link to="/finance/discount">
              <aside
                className={`px-6 py-2 hover:bg-gray-500 flex ${
                  highLight === "discount" ? "bg-gray-500" : ""
                } rounded-md gap-4 cursor-pointer group`}
              >
                <div className="flex gap-4">
                  <Discount
                    className={`${
                      highLight === "discount"
                        ? "!text-[#659DBD]"
                        : "!text-gray-400"
                    } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                  />
                  <span
                    className={`${
                      highLight === "discount"
                        ? "text-gray-200"
                        : "text-gray-400"
                    } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                  >
                    Discount
                  </span>
                </div>
                {/* <hr className="text-gray-300" /> */}
              </aside>
            </Link>
          </>
        ) : null}

        {userType === "user" ? (
          <>
            <Link to="/">
              <aside
                className={`px-6 py-2 hover:bg-gray-500 flex ${
                  highLight === "dashboard" ? "bg-gray-500" : ""
                } rounded-md gap-4 cursor-pointer group`}
              >
                <div className="flex gap-4">
                  <Dashboard
                    className={`${
                      highLight === "dashboard"
                        ? "!text-[#659DBD]"
                        : "!text-gray-400"
                    } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                  />
                  <span
                    className={`${
                      highLight === "dashboard"
                        ? "text-gray-200"
                        : "text-gray-400"
                    } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                  >
                    DashBoard
                  </span>
                </div>
                {/* <hr className="text-gray-300" /> */}
              </aside>
            </Link>

            <Link to="/manageSchool">
              <aside
                className={`px-6 py-2 flex gap-4 cursor-pointer ${
                  highLight === "manageSchool" ? "bg-gray-500" : ""
                } group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <School
                  className={`${
                    highLight === "manageSchool"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "manageSchool"
                      ? "text-gray-200"
                      : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Manage School
                </span>
              </aside>
            </Link>

            <Link to="/order_processing">
              <aside
                className={`px-6 py-2 flex gap-4 ${
                  highLight === "order_pro" ? "bg-gray-500" : ""
                } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <LocalShipping
                  className={`${
                    highLight === "order_pro"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "order_pro"
                      ? "text-gray-200"
                      : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Order Processing
                </span>
              </aside>
            </Link>
            <Link to="/manage_order">
              <aside
                className={`px-6 py-2 flex gap-4 ${
                  highLight === "manageOrder" ? "bg-gray-500" : ""
                } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <ShoppingBag
                  className={`${
                    highLight === "manageOrder"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "manageOrder"
                      ? "text-gray-200"
                      : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Manage Order
                </span>
              </aside>
            </Link>

            {isZsmLogin ? (
              <Link to="/zsm/verify_aof">
                <aside
                  className={`px-6 py-2 flex gap-4 ${
                    highLight === "aofVerify" ? "bg-gray-500" : ""
                  } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
                >
                  <AddTask
                    className={`${
                      highLight === "aofVerify"
                        ? "!text-[#659DBD]"
                        : "!text-gray-400"
                    } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                  />
                  <span
                    className={`${
                      highLight === "aofVerify"
                        ? "text-gray-200"
                        : "text-gray-400"
                    } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                  >
                    AOF Verify
                  </span>
                </aside>
              </Link>
            ) : null}

            <Link to="/kys">
              <aside
                className={`px-6 py-2 flex gap-4 ${
                  highLight === "kys" ? "bg-gray-500" : ""
                } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <Timeline
                  className={`${
                    highLight === "kys" ? "!text-[#659DBD]" : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "kys" ? "text-gray-200" : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  KYS
                </span>
              </aside>
            </Link>
            {/* <Link to="/kys"> */}
            <Link to="/projection">
              <aside
                className={`px-6 py-2 flex gap-4 ${
                  highLight === "projection" ? "bg-gray-500" : ""
                } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <LocationCityOutlined
                  className={`${
                    highLight === "projection"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "projection"
                      ? "text-gray-200"
                      : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Projection
                </span>
              </aside>
            </Link>

            <Link to="/print_pdf">
              <aside
                className={`px-6 py-2 flex gap-4 ${
                  highLight === "printpdf" ? "bg-gray-500" : ""
                } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <PrintOutlined
                  className={`${
                    highLight === "printpdf"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "printpdf" ? "text-gray-200" : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Doc Print
                </span>
              </aside>
            </Link>
            <Link to="/salesToCash">
              <aside
                className={`px-6 py-2 flex gap-4 ${
                  highLight === "salesToCash" ? "bg-gray-500" : ""
                } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <CurrencyRupee
                  className={`${
                    highLight === "salesToCash"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "salesToCash"
                      ? "text-gray-200"
                      : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Order To Cash
                </span>
              </aside>
            </Link>
            <Link to="/request_order_return">
              <aside
                className={`px-6 py-2 flex gap-4 ${
                  highLight === "return_req" ? "bg-gray-500" : ""
                } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <KeyboardReturn
                  className={`${
                    highLight === "return_req"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "return_req"
                      ? "text-gray-200"
                      : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Return Request
                </span>
              </aside>
            </Link>
            <Link to="/manage_order_return">
              <aside
                className={`px-6 py-2 flex gap-4 ${
                  highLight === "manage_return_req" ? "bg-gray-500" : ""
                } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <ManageSearch
                  className={`${
                    highLight === "manage_return_req"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "manage_return_req"
                      ? "text-gray-200"
                      : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Manage Return Request
                </span>
              </aside>
            </Link>
            {/* {roleSidebarArr.user.map((item) => {
              return (
                <Link to={item.path}>
                  <aside
                    className={`px-6 py-2 hover:bg-gray-500 flex ${
                      highLight === "dashboard" ? "bg-gray-500" : ""
                    } rounded-md gap-4 cursor-pointer group`}
                  >
                    <div className="flex gap-4">
                      <Dashboard
                        className={`${
                          highLight === `${item.highLight}`
                            ? "!text-[#659DBD]"
                            : "!text-gray-400"
                        } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                      />
                      <span
                        className={`${
                          highLight === `${item.highLight}`
                            ? "text-gray-200"
                            : "text-gray-400"
                        } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                      >
                        {item.name}
                      </span>
                    </div>
                  </aside>
                </Link>
              );
            })} */}
          </>
        ) : null}

        {userType === "user" ||
        userType === "editorial" ||
        userType === "IT" ||
        userType === "finance" ||
        userType === "training" ? (
          <Link to="/reimbursement_report">
            <aside
              className={`px-6 py-2 flex gap-4 cursor-pointer ${
                highLight === "myExpense" ? "bg-gray-500" : ""
              } group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
            >
              <Money
                className={`${
                  highLight === "myExpense"
                    ? "!text-[#659DBD]"
                    : "!text-gray-400"
                } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
              />
              <span
                className={`${
                  highLight === "myExpense" ? "text-gray-200" : "text-gray-400"
                } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
              >
                Expense Management
              </span>
            </aside>
          </Link>
        ) : null}

        {userType === "editorial" ? (
          <>
            <Link to="/printing/newPrintingReq">
              <aside
                className={`px-6 py-2 flex gap-4 cursor-pointer ${
                  highLight === "addPrintRequest" ? "bg-gray-500" : ""
                } group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <School
                  className={`${
                    highLight === "addPrintRequest"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "addPrintRequest"
                      ? "text-gray-200"
                      : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Add Print Request
                </span>
              </aside>
            </Link>
            <Link to="/printing/checkStatus">
              <aside
                className={`px-6 py-2 flex gap-4 cursor-pointer ${
                  highLight === "checkPrintStatus" ? "bg-gray-500" : ""
                } group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <School
                  className={`${
                    highLight === "checkPrintStatus"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "checkPrintStatus"
                      ? "text-gray-200"
                      : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Check Status
                </span>
              </aside>
            </Link>
          </>
        ) : null}
        {userType === "SM" ? (
          <>
            <Link to="/sm/doc_print">
              <aside
                className={`px-6 py-2 flex gap-4 ${
                  highLight === "printpdf" ? "bg-gray-500" : ""
                } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <PrintOutlined
                  className={`${
                    highLight === "printpdf"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "printpdf" ? "text-gray-200" : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Doc Print
                </span>
              </aside>
            </Link>
          </>
        ) : null}
        {userType === "sales_coordinator" ? (
          <>
            <Link to="/sc/all_return">
              <aside
                className={`px-6 py-2 flex gap-4 ${
                  highLight === "manage_return_req" ? "bg-gray-500" : ""
                } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <ManageSearch
                  className={`${
                    highLight === "manage_return_req"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "manage_return_req"
                      ? "text-gray-200"
                      : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Manage Order Return
                </span>
              </aside>
            </Link>
            <Link to="/manageSchool">
              <aside
                className={`px-6 py-2 flex gap-4 cursor-pointer ${
                  highLight === "manageSchool" ? "bg-gray-500" : ""
                } group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <School
                  className={`${
                    highLight === "manageSchool"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "manageSchool"
                      ? "text-gray-200"
                      : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Manage School
                </span>
              </aside>
            </Link>
          </>
        ) : null}
        {userType === "warehouse_GP" ? (
          <>
            <Link to="/warehouse/all_return">
              <aside
                className={`px-6 py-2 flex gap-4 ${
                  highLight === "manage_return_req" ? "bg-gray-500" : ""
                } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
              >
                <ManageSearch
                  className={`${
                    highLight === "manage_return_req"
                      ? "!text-[#659DBD]"
                      : "!text-gray-400"
                  } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
                />
                <span
                  className={`${
                    highLight === "manage_return_req"
                      ? "text-gray-200"
                      : "text-gray-400"
                  } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
                >
                  Manage Order Return
                </span>
              </aside>
            </Link>
          </>
        ) : null}
        {userType === "admin" ? <AdminSidebar highLight={highLight} /> : null}
        {/* </Link> */}
      </div>
    </div>
  );
};

export default Sidebar;

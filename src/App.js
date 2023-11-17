import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { useEffect, lazy, Suspense } from "react";
import GlobelErrorSnackbar from "./Components/Material/GlobelErrorSnackbar";
import Loader from "./Components/Material/Loader";

// import ManageOrderReturn from "./Pages/RETURN/ManageOrderReturn";
import { ReturnOrderPdf } from "./Pages/RETURN/ReturnOrderPdf";
// import AllReturn from "./Pages/SalesCoordinator/AllReturn";
// Pages
// import MySchool from "./Pages/MySchool";
// import SchoolDirectory from "./Pages/SchoolDirectory";
// import SalesInvoices from "./Pages/SalesInvoice";
// import UpdateStocks from "./Pages/UpdateStocks";
// import Opportunities from "./Pages/Opportunities";
// import AdminSignUp from "./Pages/AdminSignUp";
// import AdminAllUser from "./Pages/AdminAllUser";
// import AdminState from "./Pages/AdminState";
// import AdminCity from "./Pages/AdminCity";
// import AdminCountry from "./Pages/AdminCountry";
// import AdminLogin from "./Pages/AdminLogin";
// import MyDocument from "./Components/PdfDocument";
const Login = lazy(() => import("./Pages/Login"));
const Home = lazy(() => import("./Pages/Home"));
const Tagging = lazy(() => import("./Pages/Tagging"));
const ManageSchool = lazy(() => import("./Pages/ManageSchool"));
const AdminHome = lazy(() => import("./Pages/AdminHome"));
const AddNewCity = lazy(() => import("./Pages/AddNewCity"));
const SchoolTagging = lazy(() => import("./Pages/SchoolTagging"));
const Schools = lazy(() => import("./Pages/Schools"));
const TagSchool = lazy(() => import("./Pages/TagSchool"));
const AddSchool = lazy(() => import("./Pages/AddSchool"));
const SchoolPunchIn = lazy(() => import("./Pages/SchoolPunchIn"));
const OrderProcessing = lazy(() => import("./Pages/OrderProcessing"));
const ManageOrder = lazy(() => import("./Pages/ManageOrder"));
const AOF = lazy(() => import("./Pages/AOF"));
const KYS = lazy(() => import("./Pages/KYS"));
const ReleaseNote = lazy(() => import("./Pages/ReleaseNote"));
const V_1_0_0 = lazy(() => import("./Pages/ReleaseNotes/V.1.0.0"));
const UpdateSchool = lazy(() => import("./Pages/UpdateSchool"));
const Products = lazy(() => import("./Pages/KYS/Product"));
const AddProduct = lazy(() => import("./Pages/KYS/AddProduct"));
const Strength = lazy(() => import("./Pages/KYS/Strength"));
const AddStrength = lazy(() => import("./Pages/KYS/AddStrength"));
const UpdateFees = lazy(() => import("./Pages/KYS/UpdateFees"));
const Competition = lazy(() => import("./Pages/KYS/Competition"));
const AddCompetition = lazy(() => import("./Pages/KYS/AddCompetition"));
const AddWorkShop = lazy(() => import("./Pages/KYS/AddWorkShop"));
const Workshop = lazy(() => import("./Pages/KYS/Workshop"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
const Projection = lazy(() => import("./Pages/Projection"));
const Addprojection = lazy(() => import("./Pages/Addprojection"));
const Return = lazy(() => import("./Pages/RETURN/Return"));
const ReturnRequest = lazy(() => import("./Pages/RETURN/RequestReturn"));
const Invoice = lazy(() => import("./Pages/Invoice"));
const InvoiceItem = lazy(() => import("./Pages/InvoiceItem"));
const ManageSchoolTraining = lazy(() => import("./Pages/ManageSchoolTraining"));
const AddSchoolTraining = lazy(() => import("./Pages/AddSchoolTraining"));
const UpdateSchoolTraining = lazy(() => import("./Pages/UpdateSchoolTraining"));
const InvoiceTraining = lazy(() => import("./Pages/InvoiceTraining"));
const Inv = lazy(() => import("./Pages/PDF/Inv"));
const ViewPdf = lazy(() => import("./Pages/ViewPdf"));
const AddSchoolQuantity = lazy(() => import("./Pages/AddSchoolQuantity"));
const ClassklapDashboard = lazy(() => import("./Pages/ClassklapDashboard"));
const ClassklapManageSchool = lazy(() =>
  import("./Pages/ClassklapManageSchool")
);
const ReturnOrder = lazy(() => import("./Pages/RETURN/ReturnOrder"));
const AddSchoolCK = lazy(() => import("./Pages/AddSchoolCK"));
const LocationTraining = lazy(() => import("./Pages/LocationTraining"));
const PrintPDF = lazy(() => import("./Pages/PrintPDF"));
const ViewInvoiceSingle = lazy(() => import("./Pages/ViewInvoiceSingle"));
const ViewInvoiceDouble = lazy(() => import("./Pages/ViewInvoiceDouble"));
const BulkInv = lazy(() => import("./Pages/PDF/BulkInv"));
const CustLedger = lazy(() => import("./Pages/PDF/CustLedger"));
const ClassklapSchool = lazy(() => import("./Pages/ClassklapSchool"));
const UpdateSchoolTrainingEU = lazy(() =>
  import("./Pages/UpdateSchoolTrainingEU")
);
const GatePass = lazy(() => import("./Pages/PDF/GatePass"));
const GatePassDashboard = lazy(() => import("./Pages/GatePassDashboard"));
const GatePassInvoice = lazy(() => import("./Pages/GatePassInvoice"));
const OrderTraining = lazy(() => import("./Pages/OrderTraining"));
const AofPdf = lazy(() => import("./Pages/PDF/AofPdf"));
const AofPdf2 = lazy(() => import("./Pages/PDF/AofPdf2"));
const AOFcreate = lazy(() => import("./Pages/AOFcreate"));
const ViewCustomerLedger = lazy(() => import("./Pages/ViewCustomerLedger"));
const AdminManageSchool = lazy(() => import("./Pages/AdminManageSchool"));
const AdminAddSchool = lazy(() => import("./Pages/AdminAddSchool"));
const AdminTagging = lazy(() => import("./Pages/AdminTagging"));
const AdminUploadInvoice = lazy(() => import("./Pages/AdminUploadInvoice"));
const ZsmAOF = lazy(() => import("./Pages/ZsmAof"));
const AdminInvoice = lazy(() => import("./Pages/AdminInvoice"));
const AdminInvoiceItem = lazy(() => import("./Pages/AdminInvoiceItem"));
const AdminAddSchoolQuantity = lazy(() =>
  import("./Pages/AdminAddSchoolQuantity")
);
const FinanceAOF = lazy(() => import("./Pages/FinanceAOF"));
const SalesheadAOF = lazy(() => import("./Pages/SalesheadAOF"));
const AOFEdit = lazy(() => import("./Pages/AOFEdit"));
const AofPdf3temp = lazy(() => import("./Pages/PDF/AofPdf3temp"));
const AofPdf4 = lazy(() => import("./Pages/PDF/AofPdf4"));
const ThankYou = lazy(() => import("./Pages/ThankYou"));
const HrHome = lazy(() => import("./Pages/HR/HrHome"));
const User = lazy(() => import("./Pages/HR/User"));
const PhoneGroup = lazy(() => import("./Pages/HR/PhoneGroup"));
const AdminCkReport = lazy(() => import("./Pages/AdminCkReport"));
const CreditNote = lazy(() => import("./Pages/PDF/CreditNote"));
const CreditSinglePdf = lazy(() => import("./Pages/CreditSinglePdf"));
const SalesToCash = lazy(() => import("./Pages/SalesToCash"));
const SendMessage = lazy(() => import("./Pages/HR/SendMessage"));
const AddPrintingReq = lazy(() => import("./Pages/Printing/AddPrintingReq"));
const CheckStatus = lazy(() => import("./Pages/Printing/CheckStatus"));
const Reimbursment = lazy(() => import("./Pages/Reimbursment"));
const DocPrint = lazy(() => import("./Pages/SM/DocPrint"));
const ManageOrderReturn = lazy(() =>
  import("./Pages/RETURN/ManageOrderReturn")
);
const AllReturn = lazy(() => import("./Pages/SalesCoordinator/AllReturn"));

function App() {
  // const [userCache, setUserCache] = useState(false);
  // const [adminCache, setAdminCache] = useState(false);

  const isAuth = useSelector((state) => state.auth.user);
  const MsAuth = useSelector((state) => state.auth.msAuth);

  // const isAuth = true
  const Admin = useSelector((state) => state.auth.admin);
  // const Admin = true;
  const Zsm = useSelector((state) => state.auth.zsm);
  const Finance = useSelector((state) => state.auth.finance);
  const Saleshead = useSelector((state) => state.auth.saleshead);
  const Training = useSelector((state) => state.auth.training);
  const HR = useSelector((state) => state.auth.HR);
  const Gtepas = useSelector((state) => state.auth.gatepass);
  const Editorial = useSelector((state) => state.auth.editorial);
  const IT = useSelector((state) => state.auth.IT);
  const SM = useSelector((state) => state.auth.SM);
  const SalesCoordinator = useSelector((state) => state.auth.salesCoordinator);
  useEffect(() => {
    ReactGA.initialize("G-WWFF5R3TB6");
  }, []);

  return (
    <div>
      <div>
        {/* {console.log(Saleshead)} */}
        {/* {console.log(MsAuth)} */}
        {/* {console.log(Admin)} */}
        {/* {console.log(HR)} */}
        <div className="!font-Roboto bg-[#111322]">
          <GlobelErrorSnackbar />
          <BrowserRouter>
            <Suspense fallback={<Loader loading={true} />}>
              <Routes>
                <Route
                  path="/login"
                  element={isAuth || MsAuth ? <Home /> : <Login />}
                />
                <Route
                  path="/"
                  element={
                    isAuth || MsAuth || Admin || Zsm ? <Home /> : <Login />
                  }
                />
                {/* <Route
            path="/mySchool"
            element={isAuth || MsAuth ? <MySchool /> : <Login />}
          /> */}
                <Route
                  path="/tagging"
                  element={isAuth || MsAuth || Zsm ? <Tagging /> : <Login />}
                />
                {/* <Route
            path="/schoolDirectory"
            element={isAuth || MsAuth ? <SchoolDirectory /> : <Login />}
          /> */}
                {/* <Route
            path="/salesInvoices"
            element={isAuth || MsAuth ? <SalesInvoices /> : <Login />}
          /> */}
                {/* <Route
            path="/updateStocks"
            element={isAuth || MsAuth ? <UpdateStocks /> : <Login />}
          /> */}
                {/* <Route
            path="/opportunities"
            element={isAuth || MsAuth ? <Opportunities /> : <Login />}
          /> */}
                <Route
                  path="/manageSchool"
                  element={
                    isAuth || MsAuth || Zsm ? <ManageSchool /> : <Login />
                  }
                />
                <Route
                  path="/manageSchoolTraining"
                  element={
                    isAuth || MsAuth || Training ? (
                      <ManageSchoolTraining />
                    ) : (
                      <Login />
                    )
                  }
                />
                <Route
                  path="/school/tagging"
                  element={
                    isAuth || MsAuth || Zsm ? <SchoolTagging /> : <Login />
                  }
                />
                <Route
                  path="/school/schools"
                  element={isAuth || MsAuth || Zsm ? <Schools /> : <Login />}
                />
                <Route
                  path="/tagschool"
                  element={isAuth || MsAuth || Zsm ? <TagSchool /> : <Login />}
                />
                <Route
                  path="/addschool"
                  element={isAuth || MsAuth || Zsm ? <AddSchool /> : <Login />}
                />
                <Route
                  path="/addschooltraining"
                  element={
                    MsAuth || Training ? <AddSchoolTraining /> : <Login />
                  }
                />

                <Route
                  path="/update_school/:id"
                  element={
                    isAuth || MsAuth || Zsm ? <UpdateSchool /> : <Login />
                  }
                />

                <Route
                  path="/update_school_training/:id/:scode"
                  element={
                    MsAuth || Training || Zsm ? (
                      <UpdateSchoolTraining />
                    ) : (
                      <Login />
                    )
                  }
                />

                <Route
                  path="/update_school_training_eu/:scid/:stid/:scode"
                  element={
                    MsAuth || Training ? <UpdateSchoolTrainingEU /> : <Login />
                  }
                />

                <Route
                  path="/school/punch_in"
                  element={
                    isAuth || MsAuth || Zsm ? <SchoolPunchIn /> : <Login />
                  }
                />
                <Route
                  path="/order_processing"
                  element={
                    isAuth || MsAuth || Zsm ? <OrderProcessing /> : <Login />
                  }
                />
                <Route
                  path="/manage_order"
                  element={
                    isAuth || MsAuth || Zsm ? <ManageOrder /> : <Login />
                  }
                />
                <Route
                  path="/projection"
                  element={isAuth || MsAuth || Zsm ? <Projection /> : <Login />}
                />
                <Route
                  path="/addprojection"
                  element={
                    isAuth || MsAuth || Zsm ? <Addprojection /> : <Login />
                  }
                />

                {/* <Route
            path="/pdf_view"
            element={isAuth || MsAuth ? <MyDocument /> : <Login />}
          /> */}
                <Route
                  path="/aof"
                  element={isAuth || MsAuth || Zsm ? <AOF /> : <Login />}
                />
                {/* kys */}
                <Route
                  path="/kys"
                  element={isAuth || MsAuth || Zsm ? <KYS /> : <Login />}
                />
                <Route
                  path="/kys/products/:id"
                  element={isAuth || MsAuth || Zsm ? <Products /> : <Login />}
                />
                <Route
                  path="/kys/products/add_product/:id"
                  element={isAuth || MsAuth || Zsm ? <AddProduct /> : <Login />}
                />
                <Route
                  path="/kys/strength/:id"
                  element={isAuth || MsAuth || Zsm ? <Strength /> : <Login />}
                />
                <Route
                  path="/kys/strength/add_strength/:id"
                  element={
                    isAuth || MsAuth || Zsm ? <AddStrength /> : <Login />
                  }
                />
                <Route
                  path="/kys/tution_fees/:id"
                  element={isAuth || MsAuth || Zsm ? <UpdateFees /> : <Login />}
                />
                <Route
                  path="/kys/add_competition/:id"
                  element={
                    isAuth || MsAuth || Zsm ? <AddCompetition /> : <Login />
                  }
                />
                <Route
                  path="/kys/competition/:id"
                  element={
                    isAuth || MsAuth || Zsm ? <Competition /> : <Login />
                  }
                />
                <Route
                  path="/kys/workshop/:id"
                  element={isAuth || MsAuth || Zsm ? <Workshop /> : <Login />}
                />
                <Route
                  path="/kys/add_workshop/:id"
                  element={
                    isAuth || MsAuth || Zsm ? <AddWorkShop /> : <Login />
                  }
                />

                <Route
                  path="/web-release-notes"
                  element={
                    isAuth || MsAuth || Zsm ? <ReleaseNote /> : <Login />
                  }
                />
                {/* release notes */}

                <Route
                  path="/web-release-notes/v_1_0_0"
                  element={isAuth || MsAuth || Zsm ? <V_1_0_0 /> : <Login />}
                />

                <Route
                  path="/return"
                  element={isAuth || MsAuth || Zsm ? <Return /> : <Login />}
                />

                <Route
                  path="/return_request"
                  element={
                    isAuth || MsAuth || Zsm ? <ReturnRequest /> : <Login />
                  }
                />
                <Route
                  path="/request_order_return"
                  element={isAuth ? <ReturnOrder /> : <Login />}
                />
                <Route
                  path="/request_order_return_pdf/:id"
                  element={<ReturnOrderPdf />}
                />
                <Route
                  path="/manage_order_return"
                  element={isAuth ? <ManageOrderReturn /> : <Login />}
                />

                <Route
                  path="/invoice"
                  element={isAuth || MsAuth || Zsm ? <Invoice /> : <Login />}
                />

                <Route
                  path="/invoice_item/:invoiceid"
                  // path="/invoice_item/"
                  element={
                    isAuth || MsAuth || Zsm ? <InvoiceItem /> : <Login />
                  }
                />
                <Route
                  path="/addschoolquantity/:invoiceid"
                  element={
                    isAuth || MsAuth || Zsm ? <AddSchoolQuantity /> : <Login />
                  }
                />

                <Route
                  path="/invoice_training"
                  element={MsAuth || Training ? <InvoiceTraining /> : <Login />}
                />

                <Route
                  path="/order_training"
                  element={MsAuth || Training ? <OrderTraining /> : <Login />}
                />

                {/* <Route path="/invoice_pdf" element={<Inv />} /> */}

                <Route
                  path="/view_pdf/:docnum/:docdate"
                  element={<ViewPdf />}
                />
                <Route path="/salesToCash" element={<SalesToCash />} />

                <Route path="/view_aof_pdf/:aofid" element={<AofPdf3temp />} />
                <Route path="/view_aof_pdf2/:aofid" element={<AofPdf2 />} />
                <Route path="/zsm/view_aof_pdf2/:aofid" element={<AofPdf2 />} />
                <Route
                  path="/credit_note_pdf/:docNum/:docdate"
                  element={<CreditNote />}
                />
                <Route
                  path="/saleshead/view_aof_pdf2/:aofid"
                  element={<AofPdf2 />}
                />
                <Route
                  path="/finance/view_aof_pdf2/:aofid"
                  element={<AofPdf2 />}
                />
                <Route
                  path="/customer/aof/verify/:aofid"
                  element={<AofPdf4 />}
                />

                <Route path="/thankyou" element={<ThankYou />} />

                <Route
                  path="/bulkinv_pdf/:bp/:todate/:fromdate"
                  element={<BulkInv />}
                />

                <Route
                  path="/ck_dashboard"
                  element={
                    isAuth || MsAuth ? <ClassklapDashboard /> : <Login />
                  }
                />

                <Route
                  path="/ck_manageSchool"
                  element={
                    isAuth || MsAuth ? <ClassklapManageSchool /> : <Login />
                  }
                />

                <Route
                  path="/addschoolck"
                  element={isAuth || MsAuth ? <AddSchoolCK /> : <Login />}
                />

                <Route
                  path="/locationTraining"
                  element={
                    MsAuth || Training ? <LocationTraining /> : <Login />
                  }
                />

                <Route
                  path="/print_pdf"
                  element={
                    isAuth || MsAuth || Zsm || Admin ? <PrintPDF /> : <Login />
                  }
                />

                <Route
                  path="/invoice_pdf_single"
                  element={
                    isAuth || MsAuth || Zsm || SM || Admin ? (
                      <ViewInvoiceSingle />
                    ) : (
                      <Login />
                    )
                  }
                />
                <Route
                  path="/credit/invoice_pdf_single"
                  element={
                    isAuth || MsAuth || Zsm || SM || Admin ? (
                      <CreditSinglePdf />
                    ) : (
                      <Login />
                    )
                  }
                />

                <Route
                  path="/invoice_pdf_double"
                  element={
                    isAuth || MsAuth || Zsm || SM || Admin ? (
                      <ViewInvoiceDouble />
                    ) : (
                      <Login />
                    )
                  }
                />

                <Route
                  path="/customer_pdf"
                  element={
                    isAuth || MsAuth || Zsm || SM || Admin ? (
                      <ViewCustomerLedger />
                    ) : (
                      <Login />
                    )
                  }
                />

                <Route
                  path="/cust_ledger/:bp/:todate/:fromdate"
                  element={<CustLedger />}
                />

                <Route path="/gate_pass_pdf/:id" element={<GatePass />} />

                <Route
                  path="/add_new_city"
                  element={MsAuth || Training ? <AddNewCity /> : <Login />}
                />

                <Route
                  path="/ck_school_training"
                  element={MsAuth || Training ? <ClassklapSchool /> : <Login />}
                />

                <Route
                  path="/gatepass_dashboard"
                  element={Gtepas || MsAuth ? <GatePassDashboard /> : <Login />}
                  // element={<GatePassDashboard />}
                />

                <Route
                  path="/gatepass_invoice"
                  element={Gtepas || MsAuth ? <GatePassInvoice /> : <Login />}
                />

                <Route
                  path="/aof_create"
                  element={isAuth || MsAuth || Zsm ? <AOFcreate /> : <Login />}
                />

                <Route
                  path="/aof_edit/:aofid"
                  element={isAuth || MsAuth || Zsm ? <AOFEdit /> : <Login />}
                />

                {/* Admin */}

                {/* <Route path="/admin/signIn" element={<AdminLogin />} /> */}

                <Route
                  path="/admin/home"
                  element={Admin || MsAuth ? <AdminHome /> : <Login />}
                  // element={<AdminHome />}
                />

                <Route
                  path="/admin/manageschool"
                  element={Admin || MsAuth ? <AdminManageSchool /> : <Login />}
                  // element={<AdminManageSchool />}
                />

                <Route
                  path="/admin/uploadinvoice"
                  element={Admin || MsAuth ? <AdminUploadInvoice /> : <Login />}
                  // element={<AdminManageSchool />}
                />

                <Route
                  path="/admin/addschool"
                  element={Admin || MsAuth ? <AdminAddSchool /> : <Login />}
                  // element={<AdminAddSchool />}
                />
                <Route
                  path="/admin/invoice"
                  element={Admin || MsAuth ? <AdminInvoice /> : <Login />}
                  // element={<AdminInvoice />}
                />
                <Route
                  path="/admin/ckreport"
                  element={Admin || MsAuth ? <AdminCkReport /> : <Login />}
                  // element={<AdminInvoice />}
                />
                <Route
                  path="/admin/invoice_item/:invoiceid"
                  // element={Admin ? <AdminInvoiceItem /> : <Login />}
                  element={<AdminInvoiceItem />}
                />

                <Route
                  path="/admin/addschoolquantity/:invoiceid"
                  // element={Admin ? <AdminAddSchoolQuantity /> : <Login />}
                  element={<AdminAddSchoolQuantity />}
                />

                <Route
                  path="/zsm/verify_aof"
                  element={Zsm || MsAuth ? <ZsmAOF /> : <Login />}
                  // element={<ZsmAOF />}
                />

                <Route
                  path="/finance/aof"
                  element={Finance || MsAuth ? <FinanceAOF /> : <Login />}
                  // element={<FinanceAOF />}
                />

                <Route
                  path="/saleshead/aof"
                  element={Saleshead || MsAuth ? <SalesheadAOF /> : <Login />}
                  // element={<SalesheadAOF />}
                />
                <Route
                  path="/hr/home"
                  element={HR || MsAuth ? <HrHome /> : <Login />}
                />
                <Route
                  path="/hr/user"
                  element={HR || MsAuth ? <User /> : <Login />}
                />

                <Route
                  path="/hr/phonegroup"
                  element={HR || MsAuth ? <PhoneGroup /> : <Login />}
                />

                <Route
                  path="/hr/sendmessage"
                  element={HR || MsAuth ? <SendMessage /> : <Login />}
                />

                {/* <Route
                path="/admin/tagging"
                element={Admin ? <AdminHome /> : <Login />}
                // element={<AdminTagging />}
              /> */}

                {/* <Route
            path="/admin/user/create/new"
            element={Admin ? <AdminSignUp /> : <Login />}
          /> */}
                {/* <Route
            path="/admin/all/user"
            element={Admin ? <AdminAllUser /> : <Login />}
          /> */}
                {/* <Route
            path="/admin/location/state"
            element={Admin ? <AdminState /> : <Login />}
          /> */}
                {/* <Route
            path="/admin/location/city"
            element={Admin ? <AdminCity /> : <Login />}
          />
          <Route
            path="/admin/location/country"
            element={Admin ? <AdminCountry /> : <Login />}
          /> */}

                {/* Printing Routes */}
                <Route
                  path="/printing/newPrintingReq"
                  element={Editorial ? <AddPrintingReq /> : <Login />}
                />
                <Route
                  path="/printing/checkStatus"
                  element={Editorial ? <CheckStatus /> : <Login />}
                />
                {/* Reimbursement */}
                <Route
                  path="/reimbursement_report"
                  element={
                    isAuth || Editorial || Finance || Training || IT ? (
                      <Reimbursment />
                    ) : (
                      <Login />
                    )
                  }
                />
                {/* SM Users */}
                <Route
                  path="/sm/doc_print"
                  element={SM ? <DocPrint /> : <Login />}
                />
                <Route
                  path="*"
                  element={isAuth ? <PageNotFound /> : <Login />}
                />
                {/* Sales-Coordinator */}
                <Route
                  path="/sc/all_return"
                  element={SalesCoordinator ? <AllReturn /> : <Login />}
                />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;

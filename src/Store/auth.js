import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialAuthState = {
  user: Cookies.get("user") || null,
  admin: Cookies.get("admin") || null,
  msAuth: Cookies.get("ms-auth") || null,
  saleshead: Cookies.get("saleshead") || null,
  zsm: Cookies.get("zsm") || null,
  finance: Cookies.get("finance") || null,
  training: Cookies.get("training") || null,
  HR: Cookies.get("HR") || null,
  gatepass: Cookies.get("warehouse_GP") || null,
  editorial: Cookies.get("editorial") || null,
  IT: Cookies.get("IT") || null,
  SM: Cookies.get("SM") || null,
  salesCoordinator: Cookies.get("sales_coordinator") || null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.user = Cookies.get("user");
    },
    msLogin(state) {
      state.msAuth = Cookies.get("ms-auth");
    },
    logout(state) {
      state.user = false;
      state.msAuth = false;
      state.admin = false;
      state.zsm = false;
      state.finance = false;
      state.saleshead = false;
      state.training = false;
      state.HR = false;
      state.gatepass = false;
      state.editorial = false;
      state.SM = false;
      state.salesCoordinator = false;
    },
    adminLogin(state) {
      state.admin = Cookies.get("admin");
    },
    zsmLogin(state) {
      state.zsm = Cookies.get("zsm");
    },
    itLogin(state) {
      state.IT = Cookies.get("IT");
    },
    financeLogin(state) {
      state.finance = Cookies.get("finance");
    },
    salesheadLogin(state) {
      state.saleshead = Cookies.get("saleshead");
    },
    trainingLogin(state) {
      state.training = Cookies.get("training");
    },
    salesCoordinatorLogin(state) {
      state.salesCoordinator = Cookies.get("sales_coordinator");
    },
    HRLogin(state) {
      state.HR = Cookies.get("HR");
    },
    gatePassLogin(state) {
      state.gatepass = Cookies.get("warehouse_GP");
    },
    editorialLogin(state) {
      state.editorial = Cookies.get("editorial");
    },
    smLogin(state) {
      state.SM = Cookies.get("SM");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

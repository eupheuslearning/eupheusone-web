import store from "../Store";
import { errorActions } from "../Store/error";

export const ShowError = (errMessage) => {
  store.dispatch(errorActions.setErrorMessage(errMessage));
  store.dispatch(errorActions.setSeverity("error"));
  store.dispatch(errorActions.showMessage());
};

export const ShowSuccess = (errMessage) => {
  store.dispatch(errorActions.setErrorMessage(errMessage));
  store.dispatch(errorActions.setSeverity("success"));
  store.dispatch(errorActions.showMessage());
};

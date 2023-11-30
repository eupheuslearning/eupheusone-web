import axios from "axios";
import { errorActions } from "./Store/error";
import store from "./Store";

const instance = axios.create({
  // baseURL: "https://api.eupheusapp.com/api/",
  baseURL: "https://stageapi.eupheusapp.com/api/",
  // baseURL: "http://192.168.7.50:5070/api/",
  // baseURL: "http://192.168.7.55:5070/api/",
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle the error globally

    console.log("Axios Error:", error.response);

    if (
      error?.response?.data?.message?.errors?.length > 0 ||
      error?.response?.data?.message ||
      error?.response?.data?.status === "error"
    ) {
      if (error?.response?.data?.message?.errors?.length > 0) {
        store.dispatch(
          errorActions.setErrorMessage(
            error?.response?.data?.message?.errors[0]?.msg
          )
        );
      } else if (error?.response?.data?.message[0]?.msg) {
        store.dispatch(
          errorActions.setErrorMessage(error?.response?.data?.message[0]?.msg)
        );
      } else if (error?.response?.data?.message) {
        store.dispatch(
          errorActions.setErrorMessage(error?.response?.data?.message)
        );
      }
      store.dispatch(errorActions.showMessage());
    }
    return Promise.reject(error);
  }
);

export default instance;

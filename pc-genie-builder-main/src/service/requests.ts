import { setItemToLocalStorage } from "@/helpers/utils";
import { showToast } from "@/redux/action";
import axios from "axios";

const BASE_URL = `https://pqh5bnjg-5104.inc1.devtunnels.ms/`;

export const apiRequest = async (url, method, data = {}, options: any = {}) => {
  try {
    const response = await axios({
      url: `${BASE_URL}${url}`,
      method,
      data,
      headers: { "Content-Type": "application/json", ...options.headers }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Request failed";
  }
};

export const adminLogin = (body, navigateAfterSuccess) => async (dispatch) => {
  try {
    await apiRequest("Admin/Login", "POST", body);
    dispatch(showToast("success", "Logged in successfully"));
    setItemToLocalStorage("isAdmin", true);
    navigateAfterSuccess();
  } catch (error) {
    dispatch(showToast("error", "Unauthorized"));
  }
};

export const GetComponentTypes = () => async (dispatch) => {
  try {
    const response = await apiRequest(
      "ComponentType/GetAllComponentTypes",
      "GET"
    );
    return response;
  } catch (error) {
    dispatch(showToast("error", "Unauthorized"));
    throw error;
  }
};

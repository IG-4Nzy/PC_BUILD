import { setItemToLocalStorage } from "@/helpers/utils";
import { showToast } from "@/redux/action";
import axios from "axios";

const BASE_URL = `http://localhost:5104/`;

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

export const adminLogin = (body) => async (dispatch) => {
  try {
    await apiRequest("Admin/Login", "POST", body);
    dispatch(showToast("success", "Logged in successfully"));
    setItemToLocalStorage("isAdmin", true);
  } catch (error) {
    dispatch(showToast("error", "Unauthorized"));
  }
};

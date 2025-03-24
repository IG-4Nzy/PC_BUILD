import { setItemToLocalStorage } from "@/helpers/utils";
import { showToast } from "@/redux/action";
import { setComponents, setComponentTypes } from "@/redux/slice";
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
    dispatch(setComponentTypes(response));
  } catch (error) {
    dispatch(showToast("error", "Unauthorized"));
    throw error;
  }
};

export const createComponentType = (body) => async (dispatch) => {
  try {
    const response = await apiRequest(
      "ComponentType/AddComponentType",
      "POST",
      body
    );
    if (response.value) {
      dispatch(showToast("success", "Created Successfully"));
      dispatch(GetComponentTypes());
    }
  } catch (error) {
    dispatch(showToast("error", error.title));
    throw error;
  }
};

export const deleteComponentType = (id) => async (dispatch) => {
  try {
    const response = await apiRequest(
      `ComponentType/DeleteComponentType?id=${id}`,
      "DELETE"
    );
    if (response.value) {
      dispatch(showToast("success", "Deleted Successfully"));
      dispatch(GetComponentTypes());
    }
  } catch (error) {
    dispatch(showToast("error", error.title));
    throw error;
  }
};

export const createComponent = (body) => async (dispatch) => {
  try {
    const response = await apiRequest("Component/AddComponent", "POST", body);
    if (response.value) {
      dispatch(showToast("success", "Created Successfully"));
      dispatch(getComponents(body?.type?.id));
    }
  } catch (error) {
    dispatch(showToast("error", error.title));
    throw error;
  }
};

export const getComponents =
  (id, setLoader?: () => void) => async (dispatch) => {
    try {
      const response = await apiRequest(
        `Component/GetAllComponentsInType?typeId=${id}`,
        "GET"
      );
      dispatch(setComponents(response));
      if (response.length > 0) {
        setLoader && setLoader();
      }
    } catch (error) {
      dispatch(showToast("error", "Unauthorized"));
      throw error;
    }
  };

export const deleteComponent = (id, typeId) => async (dispatch) => {
  try {
    const response = await apiRequest(
      `Component/DeleteComponent?id=${id}`,
      "DELETE"
    );
    if (response.value) {
      dispatch(showToast("success", "Deleted Successfully"));
      dispatch(getComponents(typeId));
    }
  } catch (error) {
    dispatch(showToast("error", error.title));
    throw error;
  }
};

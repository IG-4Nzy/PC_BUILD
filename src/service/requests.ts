import axios from "axios";
const BASE_URL = `http://localhost:5104/`;

export const adminLogin = async () => {
  try {
    const res = await axios.get(`${BASE_URL}Admin/Login`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(res.data);
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

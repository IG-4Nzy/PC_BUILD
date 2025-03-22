import axios from "axios";
const BASE_URL = `http://localhost:5104/`;

export const adminLogin = async (body: {
  userId: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${BASE_URL}Admin/Login`, {
      body
    });
    console.log(res.data);
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

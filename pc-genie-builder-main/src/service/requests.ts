import axios from "axios";
const BASE_URL = `http://localhost:5104/`;

export const adminLogin = async (body) => {
  try {
    const res = await axios.post(
      `${BASE_URL}Admin/Login`,
      {
        userId: body?.userId,
        password: body?.password
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

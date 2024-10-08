import {
  signInRequest,
  signInResponse,
  refreshRequest,
  refreshAuthResponse,
} from "./defnition"; // pastikan penamaan file benar

import Cookies from "js-cookie";
import axios from "axios";

export async function LoginApi(
  fromdata: signInRequest
): Promise<signInResponse> {
  try {
    const response = await axios.post<signInResponse>(
      "https://dummyjson.com/auth/login",
      fromdata,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // Tidak perlu memeriksa response.ok
    const data = response.data;

    // Simpan token dan refreshToken di cookies
    Cookies.set("token", data.token, { expires: 1 / 24 });
    Cookies.set("refToken", data.refreshToken, { expires: 2 / 24 });
    Cookies.set("userId", data.id.toString());

    return data; // Kembalikan data sebagai signInResponse
  } catch (error) {
    // Tangani error yang mungkin terjadi
    throw new Error("Login Failed!");
  }
}

export async function RefreshAuthApi(
  requestData: refreshRequest
): Promise<refreshAuthResponse> {
  const isTokenExist = Cookies.get("refToken");

  if (isTokenExist) {
    try {
      const response = await axios.post<refreshAuthResponse>(
        "https://dummyjson.com/auth/refresh",
        requestData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;
      Cookies.set("token", data.token, { expires: 1 / 24 });
      Cookies.set("refToken", data.refreshToken, { expires: 2 / 24 });
      return data; // Kembalikan data sebagai refreshAuthResponse
    } catch (error) {
      throw new Error("Refresh Token Failed!");
    }
  } else {
    throw new Error(`Refresh Token Doesn't Exist!`);
  }
}

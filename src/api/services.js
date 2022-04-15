import axios from "./requestInterceptor";
import API_URLS from "./apiUrls";

export const Login = async (data) => {
  try {
    let res = await axios.post(API_URLS.USER.LOGIN, data);
    if (res.data && res.status === 200) {
    }
    return res;
  } catch (ex) {
    throw ex;
  }
};

export const ForgetPass = async (data) => {
  try {
    let res = await axios.post(API_URLS.USER.ForgetPass, data);
    if (res.data && res.status === 200) {
    }
    return res;
  } catch (ex) {
    throw ex;
  }
};

export const Signup = async (data) => {
  try {
    let res = await axios.post(API_URLS.USER.Signup, data);
    if (res.data && res.status === 200) {
      console.log("resData", res.data);
    }
    return res;
  } catch (ex) {
    throw ex;
  }
};

export const GoogleSignUp = async (data) => {
  try {
    let res = await axios.post(API_URLS.USER.GOOGLESIGNIN, data);
    if (res.data && res.status === 200) {
      console.log("resData", res.data);
    }
    return res;
  } catch (ex) {
    throw ex;
  }
};

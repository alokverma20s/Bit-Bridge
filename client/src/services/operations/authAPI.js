import { toast } from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const {
  SENDOTP_API,PROFILE_QUESTIONS_API
} = endpoints;

export function sendOtp(setVerify, email) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email
      });
      // console.log("SENDOTP API RESPONSE............", response);

      // console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      setVerify(true);
      // navigate("/verify-email")
    } catch (error) {
      // console.log("SENDOTP API ERROR............", error)
      console.log(error);
      toast.error(error.response.data.message);
    }
    // dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}



export function profileQuestions(id, setQuestions, setLoading){
  return async (dispatch)=>{
    setLoading(true);
    try {
      const response = await apiConnector("POST", PROFILE_QUESTIONS_API, {
        id
      });
      if(!response.data.success){
        throw new Error(response.data.message);
      }
      setQuestions(response.data.questions);
      setLoading(false)
    } catch (error) {
      toast(error.response.data.message);
    }
  }
} 
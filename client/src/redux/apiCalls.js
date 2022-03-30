import { publicRequest } from "../requestMethod";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

//take dispatch and user information
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try{
    //take user info from login page and try to post request
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  }catch(err){
    dispatch(loginFailure());
  }
}
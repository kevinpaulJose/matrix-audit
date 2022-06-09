// import { async } from "@firebase/util";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firedb } from "../../utils/firebase/config";
import { setUserId } from "../../utils/firebase/functions";
import * as ActionTypes from "./ActionTypes";

let interval;
export const fetchUser =
  ({ email }) =>
  async (dispatch) => {
    console.log("Fetching called");
    dispatch(userLoading());

    dispatch(addUser([email]));

    // }
  };
export const stopFetching = () => (dispatch) => {
  clearInterval(interval);
  let retData = [];
  dispatch(addUser(retData));
};

export const removeUser = () => async (dispatch) => {
  console.log("Removing user");
  let retData = [];
  dispatch(addUser(retData));
};

export const userLoading = () => ({
  type: ActionTypes.USER_LOADING,
  payload: true,
});
export const addUser = (data) => ({
  type: ActionTypes.USER_UPDATE,
  payload: data,
});
export const userError = () => ({
  type: ActionTypes.USER_ERROR,
  payload: true,
});

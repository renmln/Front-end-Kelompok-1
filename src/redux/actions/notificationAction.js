import {
  GET_ALL_NOTIFICATION,
  NOTIFICATION_ERROR,
  UPDATE_NOTIFICATION,
} from "./types";
import axios from "axios";
import Swal from "sweetalert2";

export const getAllNotificationByIdSeller = (params) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://secondhand-backend-k1.herokuapp.com/api/v1/notif/findmynotif`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();

    dispatch({
      type: GET_ALL_NOTIFICATION,
      notification: data,
      status: "ID_SELLER",
    });
  } catch (error) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: error.response,
    });
    // Swal.fire({
    //     position: "center",
    //     icon: "error",
    //     title: error.message,
    //     showConfirmButton: false,
    //     timer: 1500,
    // });
  }
};

export const updateNotification = (params) => async (dispatch) => {
  try {
    const status = params.status;

    console.log(params);
    // const data = await response.json();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    };
    const response = await axios.put(
      `https://secondhand-backend-k1.herokuapp.com/api/v1/notif/update/${params.id}`,
      {
        status,
      },
      config
    );
    const data = await response.data;

    dispatch({
      type: UPDATE_NOTIFICATION,
      status: data.status,
    });
  } catch (error) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: error.response,
    });

    Swal.fire({
      position: "center",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

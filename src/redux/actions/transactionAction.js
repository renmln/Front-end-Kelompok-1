import Swal from "sweetalert2";
import {
  GET_ALL_TRANSACTION,
  CREATE_TRANSACTION,
  TRANSACTION_ERROR,
  UPDATE_TRANSACTION,
} from "./types";
import axios from "axios";

export const getAllTransaction = () => async (dispatch) => {
  try {
    const res = await fetch(
      `https://secondhand-backend-k1.herokuapp.com/api/v1/transactions`
    );
    const data = await res.json();
    dispatch({
      type: GET_ALL_TRANSACTION,
      transaction: data,
      status: "OK",
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: err.response.data.msg,
    });
  }
};

export const addTransaction = (params) => async (dispatch) => {
  try {
    const id_seller = params.id_seller;
    const id_buyer = params.id_buyer;
    const id_offering = params.id_offering;
    const id_product = params.id_product;
    const status = params.status;

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    };
    const response = await axios.post(
      "https://secondhand-backend-k1.herokuapp.com/api/v1/transaction",
      {
        id_seller,
        id_offering,
        id_buyer,
        id_product,
        status,
      },
      config
    );
    const data = await response.data;

    console.log(data);

    dispatch({
      type: CREATE_TRANSACTION,
      status: data.status,
    });
    // Swal.fire({
    //     title: "Berhasil",
    //     text: "Harga tawaranmu telah terkirim",
    //     icon: "success",
    //     confirmButtonText: "OK",
    // });
  } catch (error) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: error.response,
    });

    Swal.fire({
      position: "center",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 150000,
    });
  }
};

export const updateTransaction = (params) => async (dispatch) => {
  try {
    const status = params.status;

    // var formdata = new FormData();
    // formdata.append("status", params.status)

    // const response = await fetch(`https://secondhand-backend-k1.herokuapp.com/api/v1/transactions/update/${params.id}`, {
    //     method: "PUT",
    //     headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //     body: status,
    // });
    console.log(params);
    // const data = await response.json();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    };
    const response = await axios.put(
      `https://secondhand-backend-k1.herokuapp.com/api/v1/transactions/update/${params.id}`,
      {
        status,
      },
      config
    );
    const data = await response.data;

    dispatch({
      type: UPDATE_TRANSACTION,
      status: data.status,
    });

    // Swal.fire({
    //     position: "center",
    //     icon: "success",
    //     title: "Success",
    //     showConfirmButton: false,
    //     timer: 1500,
    // });
  } catch (error) {
    dispatch({
      type: TRANSACTION_ERROR,
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

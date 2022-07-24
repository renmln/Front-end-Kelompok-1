import Swal from "sweetalert2";
import {
  CREATE_OFFERING,
  GET_ALL_OFFERING,
  GET_OFFER,
  OFFERING_ERROR,
  GET_ALL,
  DELETE_OFFERING,
  UPDATE_OFFERING,
} from "./types";
import axios from "axios";

export const addOffering = (params) => async (dispatch) => {
  try {
    console.log("post offering");
    console.log(params);
    const id_product = params.id_product;
    const offering_price = params.offering_price;
    const no_hp = params.no_hp;
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    };
    const response = await axios.post(
      "https://secondhand-backend-k1.herokuapp.com/api/v1/products/offer",
      {
        id_product,
        offering_price,
        no_hp,
      },
      config
    );
    const data = await response.data;

    console.log(data);

    dispatch({
      type: CREATE_OFFERING,
      status: data.status,
    });
    Swal.fire({
      title: "Berhasil",
      text: "Harga tawaranmu telah terkirim",
      icon: "success",
      confirmButtonText: "OK",
    });
  } catch (error) {
    dispatch({
      type: OFFERING_ERROR,
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

export const getOfferbyIDProduct = (params) => async (dispatch) => {
  try {
    const id = params.id;
    const response = await fetch(
      `https://secondhand-backend-k1.herokuapp.com/api/v1/products/offered/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    console.log("ini data" + JSON.stringify(data));
    dispatch({
      type: GET_ALL_OFFERING,
      offering: data,
      status: "ID_PRODUCT",
    });
  } catch (error) {
    dispatch({
      type: OFFERING_ERROR,
      payload: error.response,
    });
    Swal.fire({
      position: "center",
      icon: "error",
      title: error.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const getOfferingByIdBuyer = (params) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://secondhand-backend-k1.herokuapp.com/api/v1/products/offer`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();

    dispatch({
      type: GET_ALL_OFFERING,
      offering: data,
      status: "ID_BUYER",
    });
  } catch (error) {
    dispatch({
      type: OFFERING_ERROR,
      payload: error.response,
    });
    Swal.fire({
      position: "center",
      icon: "error",
      title: error.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const getAllOffering = () => async (dispatch) => {
  try {
    const res = await fetch(
      `https://secondhand-backend-k1.herokuapp.com/api/v1/products/alloffer`
    );
    const data = await res.json();
    dispatch({
      type: GET_ALL,
      alloffer: data,
      status: "OK",
    });
  } catch (err) {
    dispatch({
      type: OFFERING_ERROR,
      payload: err.response.data.msg,
    });
  }
};

export const deleteOffering = (params) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://secondhand-backend-k1.herokuapp.com/api/v1/product/offered/delete/${params.id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();

    dispatch({
      type: DELETE_OFFERING,
      payload: data.status,
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Delete success",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    dispatch({
      type: OFFERING_ERROR,
      payload: error,
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

export const updateOffering = (params) => async (dispatch) => {
  try {
    const status = params.status;

    console.log(params);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    };
    const response = await axios.put(
      `https://secondhand-backend-k1.herokuapp.com/api/v1/product/offered/update/${params.id}`,
      {
        status,
      },
      config
    );
    const data = await response.data;

    dispatch({
      type: UPDATE_OFFERING,
      status: data.status,
    });
  } catch (error) {
    dispatch({
      type: OFFERING_ERROR,
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

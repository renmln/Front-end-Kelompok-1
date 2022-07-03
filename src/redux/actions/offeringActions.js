import Swal from "sweetalert2";
import { CREATE_OFFERING, OFFERING_ERROR } from "./types";
import axios from "axios";

export const addOffering = (params) => async (dispatch) => {
  try {
    const id_product = params.id_product;
    const offering_price = params.offering_price;
    console.log(id_product);
    // var formdata = new FormData();
    // formdata.append("id_product", id_product);
    // formdata.append("id_buyer", id_buyer);
    // formdata.append("offering_price", offering_price);
    // const x = {};
    // formdata.forEach((value, key) => (x[key] = value));
    // console.log("m" + JSON.stringify(x))
    // // console.log("t" + JSON.stringify(formdata))

    // const response = await fetch(
    //   "http://localhost:8000/api/v1/products/offer",
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       "Content-type": "application/json",
    //     },
    //     body: formdata,
    //   }
    // );

    // const data = await response.json();
    // console.log(data)
    // dispatch({
    //   type: CREATE_OFFERING,
    //   status: data.status,
    // });
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    };
    const response = await axios.post(
      "http://localhost:8000/api/v1/products/offer",
      {
        id_product,
        offering_price,
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

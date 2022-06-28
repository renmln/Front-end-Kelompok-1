import Swal from "sweetalert2";
import {GET_ALL_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, CLEAR_PRODUCT, PRODUCT_ERROR, DELETE_PRODUCT} from "./types";

const {REACT_APP_BACKEND} = process.env;

// Di Halaman Landing Page
export const getAllProduct = () => async (dispatch) => {
    try {
        const res = await fetch(`http://localhost:8000/api/v1/products`);
        const data = await res.json();
        dispatch({
            type: GET_ALL_PRODUCT,
            payload: data,
            status: "OK",
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: err.response.data.msg,
        });
    }
};

// Di Halaman Daftar Jual
export const getAllProductByIdSeller = (params) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/products/${params}`, {
            method: "GET",
        });
        const data = await response.json();

        dispatch({
            type: GET_ALL_PRODUCT,
            payload: data,
            status: "OK",
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_ERROR,
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

export const addProduct = (params) => async (dispatch) => {
    try {
        var formdata = new FormData();
        formdata.append("idSeller", params.idSeller);
        formdata.append("namaProduk", params.namaProduk);
        formdata.append("hargaProduk", params.hargaProduk);
        formdata.append("kategori", params.kategori);
        formdata.append("deskripsi", params.deskripsi);

        if (params.fotoProduk.length > 0) {
            if (params.fotoProduk[0].type === "image/jpeg" || params.fotoProduk[0].type === "image/png") {
                formdata.append("fotoProduk", params.fotoProduk[0]);
            }
            if (params.fotoProduk[1].type === "image/jpeg" || params.fotoProduk[1].type === "image/png") {
                formdata.append("fotoProduk", params.fotoProduk[1]);
            }
            if (params.fotoProduk[2].type === "image/jpeg" || params.fotoProduk[2].type === "image/png") {
                formdata.append("fotoProduk", params.fotoProduk[2]);
            }
            if (params.fotoProduk[3].type === "image/jpeg" || params.fotoProduk[3].type === "image/png") {
                formdata.append("fotoProduk", params.fotoProduk[3]);
            }
        }

        const response = await fetch(REACT_APP_BACKEND + "/api/v1/product", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formdata,
        });

        const data = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            payload: data.status,
        });

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Success",
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_ERROR,
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

export const updateProduct = (params) => async (dispatch) => {
    try {
        var formdata = new FormData();
        formdata.append("id", params.id);
        formdata.append("idSeller", params.idSeller);
        formdata.append("namaProduk", params.namaProduk);
        formdata.append("hargaProduk", params.hargaProduk);
        formdata.append("kategori", params.kategori);
        formdata.append("deskripsi", params.deskripsi);
        formdata.append("statusProduk", params.statusProduk);

        // Delete old image
        if (Array.isArray(params.oldImage)) {
            for (var x = 0; x < params.oldImage.length; x++) {
                formdata.append("oldImage", params.oldImage[x]);
            }
        } else {
            formdata.append("oldImage", params.oldImage);
        }

        // Upload new image
        if (params.fotoProduk.length > 0) {
            if (params.fotoProduk[0].type === "image/jpeg" || params.fotoProduk[0].type === "image/png") {
                formdata.append("fotoProduk", params.fotoProduk[0]);
            }
            if (params.fotoProduk[1].type === "image/jpeg" || params.fotoProduk[1].type === "image/png") {
                formdata.append("fotoProduk", params.fotoProduk[1]);
            }
            if (params.fotoProduk[2].type === "image/jpeg" || params.fotoProduk[2].type === "image/png") {
                formdata.append("fotoProduk", params.fotoProduk[2]);
            }
            if (params.fotoProduk[3].type === "image/jpeg" || params.fotoProduk[3].type === "image/png") {
                formdata.append("fotoProduk", params.fotoProduk[3]);
            }
        }

        const response = await fetch(REACT_APP_BACKEND + "/api/v1/product", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formdata,
        });

        const data = await response.json();

        dispatch({
            type: UPDATE_PRODUCT,
            payload: data.status,
        });

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Success",
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_ERROR,
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

export const deleteProduct = (params) => async (dispatch) => {
    const {id, oldImage} = params;
    try {
        const response = await fetch(REACT_APP_BACKEND + "/api/v1/product?" + new URLSearchParams({id, oldImage}), {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await response.json();

        dispatch({
            type: DELETE_PRODUCT,
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
            type: PRODUCT_ERROR,
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

export const clearProduct = () => async (dispatch) => {
    dispatch({
        type: CLEAR_PRODUCT,
    });
};

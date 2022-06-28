import Swal from "sweetalert2";
import {AUTH_ERROR, LOGIN, REGISTER, CLEAR, LOGOUT, UPDATE_INFO_USERS} from "./types";

const {REACT_APP_BACKEND} = process.env;

export const login = (data) => async (dispatch) => {
    try {
        // Login
        const response = await fetch("http://localhost:8000/api/v1/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();

        if (result.token) {
            dispatch({
                type: LOGIN,
                payload: result.token,
                user: result.email,
            });
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Login Successful",
                showConfirmButton: false,
                timer: 1000,
            });
        } else {
            authError(result.error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Login Failed",
                showConfirmButton: false,
                timer: 1000,
            });
        }
    } catch (error) {
        authError(error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Email or Password is incorrect",
            showConfirmButton: false,
            timer: 1000,
        });
    }
};

export const regis = (data) => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:8000/api/v1/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.status === 422) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: result.message,
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Registration Successful",
                showConfirmButton: false,
                timer: 1000,
            });
        }

        dispatch({
            type: REGISTER,
            status: result.status,
        });
    } catch (error) {
        authError(error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Registration Failed",
            showConfirmButton: false,
            timer: 1500,
        });
    }
};

export const loginWithGoogle = (accessToken) => async (dispatch) => {
    try {
        const data = {
            access_token: accessToken,
        };

        const response = await fetch(REACT_APP_BACKEND + "/api/v1/auth/google", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        const userInfo = JSON.parse(JSON.stringify(result.user));

        if (result.token) {
            dispatch({
                type: LOGIN,
                payload: result.token,
                user: userInfo,
            });
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Login Successful",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            authError(result.error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Login Failed",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    } catch (error) {
        authError(error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Login Failed",
            showConfirmButton: false,
            timer: 1500,
        });
    }
};

export const updateInfoUsers = (data) => async (dispatch) => {
    try {
        var formdata = new FormData();
        formdata.append("nama", data.nama);
        formdata.append("kota", data.kota);
        formdata.append("alamat", data.alamat);
        formdata.append("noHp", data.noHp);
        if (data.fotoUser) {
            formdata.append("fotoUser", data.fotoUser);
        }

        const response = await fetch(REACT_APP_BACKEND + "/api/v1/auth/me", {
            method: "PUT",
            body: formdata,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const result = await response.json();

        dispatch({
            type: UPDATE_INFO_USERS,
            payload: result.data,
            status: "OK",
        });

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Update Successful",
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        authError(error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Update Failed",
            showConfirmButton: false,
            timer: 1500,
        });
    }
};

export const auth = () => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/users/${localStorage.getItem("email")}`, {
            method: "GET",
        });

        const result = await response.json();

        dispatch({
            type: UPDATE_INFO_USERS,
            payload: result,
            status: "OK",
        });
    } catch (error) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Session Expired, Please Login Again",
            showConfirmButton: false,
            timer: 1500,
        });
    }
};

export const clear = () => async (dispatch) => {
    dispatch({
        type: CLEAR,
    });
};

const authError = (error) => async (dispatch) => {
    dispatch({
        type: AUTH_ERROR,
        payload: error.message,
    });

    setTimeout(() => {
        dispatch({
            type: AUTH_ERROR,
            payload: null,
        });
    }, 5000);
};

export const logout = () => async (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
    Swal.fire({
        position: "center",
        icon: "info",
        title: "Logout Successful",
        showConfirmButton: false,
        timer: 1500,
    });
};

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { verifiedLink, resetPassword } from "../../redux/actions/authActions";

export default function ResetPassword() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [validpassword, setValidPassword] = useState("");
  const validUrl = message === "verified" ? true : false;

  useEffect(() => {
    dispatch(verifiedLink(token));
  }, [dispatch, token]);

  console.log(message);

  const handleSubmit = () => {
    const data = { password };
    if (password !== validpassword) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Password is not match",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      dispatch(resetPassword(token, data));
      // window.location = '/login';
    }
  };

  return (
    <div style={{ marginTop: "170px" }}>
      <div className="container">
        {validUrl ? (
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      placeholder="masukkan password baru"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      placeholder="ulangi password"
                      className="form-control"
                      value={validpassword}
                      onChange={(e) => setValidPassword(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1 style={{ textAlign: "center" }}>404 Not Found</h1>
        )}
      </div>
    </div>
  );
}

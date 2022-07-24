import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendLinkResetPassword } from "../../redux/actions/authActions";

const LupaPassword = () => {
  const dispatch = useDispatch();
  //   const { user, detailUser } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (!email) {
      setError("Email wajib diisi");
    } else {
      const data = { email };
      console.log(data)
      dispatch(sendLinkResetPassword(data));
      setError("");
    }
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              {error && (
                <div className="alert alert-danger">
                  <p>{error}</p>
                </div>
              )}

              <div className="card-body">
                <div className="form-group">
                  <center>
                    <h1>Lupa Password</h1>
                  </center>
                  <center>
                    <p>Silahkan cek email di Kotak Masuk dan SPAM!</p>
                  </center>
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Masukkan email"
                    className="form-control"
                    value={email}
                    onChange={changeEmail}
                  />
                </div>

                <button className="btn btn-primary" onClick={handleSubmit}>
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LupaPassword;

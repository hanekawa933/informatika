import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { changeUsername } from "../actions/auth";

const ChangeUsername = ({ changeUsername, match, success }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    changeUsername(match.params.username, username, password);
  };

  console.log(match.params.username);
  console.log(username);
  console.log(password);

  if (success) {
    return <Redirect to="/admin/dashboard" />;
  }

  return (
    <div className="d-flex flex-row">
      <Sidebar sidebar="vh-100" />
      <div className="d-flex justify-content-center align-items-center w-100 flex-column">
        <h1 className="mb-5">Ganti Username</h1>
        <form className="vh-50 w-50" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="Username Baru">Masukkan Username Baru</label>
            <input
              type="text"
              name="username"
              className="form-control"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Konfirmasi Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block">
              Ganti Username
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  success: state.auth.success,
});

export default connect(mapStateToProps, { changeUsername })(ChangeUsername);

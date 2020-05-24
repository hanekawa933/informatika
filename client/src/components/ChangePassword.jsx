import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { changePassword } from "../actions/auth";

const ChangeProfile = ({ changePassword, match, success }) => {
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    retypePassword: "",
  });

  const { password, newPassword, retypePassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    changePassword(match.params.username, password, newPassword);
  };

  if (success) {
    return <Redirect to="/admin/dashboard" />;
  }

  return (
    <div className="d-flex flex-row">
      <Sidebar sidebar="vh-100" />
      <div className="d-flex justify-content-center align-items-center w-100 flex-column">
        <h1 className="mb-5">Ganti Password</h1>
        <form className="vh-50 w-50" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="Password Lama">Password Lama</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password Baru">Password Baru</label>
            <input
              type="password"
              name="newPassword"
              className="form-control"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Retype Password Baru">
              Ketik Ulang Password Baru
            </label>
            <input
              type="password"
              name="retypePassword"
              className="form-control"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block">
              Ganti Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.auth.data,
  success: state.auth.success,
});

export default connect(mapStateToProps, { changePassword })(ChangeProfile);

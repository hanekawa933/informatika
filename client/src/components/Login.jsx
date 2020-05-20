import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(username, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/admin/dashboard" />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary-secondary-gradient vh-100">
      <div className="w-30 vh-50 d-flex justify-content-center align-items-center flex-column rounded text-dark bg-light">
        <div className="display-4">Login Page</div>
        <form className="w-75 my-5" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="Username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Username">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(e) => onChange(e)}
            />
          </div>
          <button className="btn btn-primary my-3 btn-block">Login</button>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

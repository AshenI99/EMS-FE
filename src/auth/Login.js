import React, {Component, useState} from 'react';
import { Link } from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';

import request from "../helpers/requestHelper";

const Login=()=>{

  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  const onChangeHandler=(e)=>{
    const {id, value} = e.target;

    setFormState({
      ...formState,
      [id]: value
    })
  }

  const onSubmit= async (e)=>{
    e.preventDefault();

    try {
      const res = await request({
        url: `auth/login`,
        auth: false,
        method: 'POST',
        data: formState
      });

      localStorage.setItem("token", res.toString());

    } catch (err) {

    }

  }

  return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo text-end">
                  <img src={require("../assets/logo.png")} alt="logo" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form className="pt-3" onSubmit={onSubmit}>
                  <div className="form-group">
                    <input type="email" id="email" placeholder="Email"  onChange={onChangeHandler} value={formState.email} required className="form-control form-control-lg"  />
                  </div>
                  <div className="form-group">
                    <input type="text" id="password" placeholder="Password" onChange={onChangeHandler} value={formState.password} required className="form-control form-control-lg"  />
                  </div>
                  <div className="mt-3">
                    <Button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit">SIGN IN</Button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/auth/register" className="text-primary">Create</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login

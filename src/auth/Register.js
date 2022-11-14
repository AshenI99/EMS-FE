import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button} from "react-bootstrap";

import request from "../helpers/requestHelper";

const Register=()=>{

  const history = useNavigate();

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    institute: '',
    mobile: '',
    password: ''
  });
  
  const onChangeHandler=(e)=>{
    const {id, value} = e.target;
    
    setFormState({
      ...formState,
      [id]: value
    })
  }

  const onSubmit=async (e)=>{
    e.preventDefault();

    try {
      const res = await request({
        url: `auth/signup`,
        auth: false,
        method: 'POST',
        data: formState
      });

      if(res){
        history("/auth/login")
      }

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
                <h4>New here?</h4>
                <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                <form className="pt-3" onSubmit={onSubmit}>
                  <div className="form-group">
                    <input type="text" required className="form-control form-control-lg" id="firstName" onChange={onChangeHandler} value={formState.firstName} placeholder="First Name" />
                  </div>
                  <div className="form-group">
                    <input type="text" required className="form-control form-control-lg" id="lastName" onChange={onChangeHandler} value={formState.lastName} placeholder="Last Name" />
                  </div>
                  <div className="form-group">
                    <input type="email" required className="form-control form-control-lg" id="email" onChange={onChangeHandler} value={formState.email} placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <input type="text" required className="form-control form-control-lg" id="institute" onChange={onChangeHandler} value={formState.institute} placeholder="Institute" />
                  </div>
                  <div className="form-group">
                    <input type="text" required className="form-control form-control-lg" id="mobile" onChange={onChangeHandler} value={formState.mobile} placeholder="Mobile Number" />
                  </div>
                  <div className="form-group">
                    <input type="password" required className="form-control form-control-lg" id="password" onChange={onChangeHandler} value={formState.password} placeholder="Password" />
                  </div>
                  <div className="mt-3">
                    <Button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type='submit'>SIGN UP</Button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account? <Link to="/auth/login" className="text-primary">Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Register

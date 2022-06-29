import React, { useState, useEffect } from 'react'
import axios from 'axios';
import StyledInput from '../styledInput'
import "../Signup/style.css";
import { useNavigate } from "react-router-dom"


export default function Login() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("hello from login", formFields)
    axios.post('http://localhost:4000/login', {
      ...formFields

    })
      .then(res => {
        navigate("/home")
        console.log("res from login----->>>>", res)

      })
      .catch(err => {
        console.log(err);
      })

  }

  const handleChange = (name, val) => {
    setFormFields(
      (prevValues) => ({ ...prevValues, [name]: val })
    )
  }



  return (
    <div className="container" >

      <div className="form-container" >
        <form onSubmit={handleSubmit} className="form-css" >
          <div className="title">Login Form</div>
          <div className="divider" />
          <div className="divider" />
          <StyledInput
            label={"Email"}
            name='email'
            handleChange={handleChange}
          />
          <div className="divider" />
          <StyledInput
            label={"Password"}
            name='password'
            handleChange={handleChange}
          />
          <div className="divider" />
          <div>
            <button className="button-css" type="submit">Submit</button>

          </div>
        </form>

      </div>

    </div>
  )
}

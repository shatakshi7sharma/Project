import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './style.css'
import StyledInput from '../styledInput';
import { useNavigate } from "react-router-dom"

export default function Signup() {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("hello from signup", formFields)
        axios.post('http://localhost:4000/signup', {
            ...formFields

        })
            .then(res => {
                navigate("/login")
                console.log("res from signup----->>>>", res)

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

                    <div className="title">Signup Form</div>
                    <div className="divider" />
                    <StyledInput
                        label={"First Name"}
                        name='firstName'
                        handleChange={handleChange}
                    />

                    <div className="divider" />
                    <StyledInput
                        label={"Last Name"}
                        name="lastName"
                        handleChange={handleChange}

                    />
                    <div className="divider" />

                    <StyledInput
                        label={"Email"}
                        name="email"
                        handleChange={handleChange}

                    />
                    <div className="divider" />

                    <StyledInput
                        label={"Password"}
                        name="password"
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

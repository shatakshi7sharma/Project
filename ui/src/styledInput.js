import React, { useState, useEffect } from 'react'

export default function StyledInput({ label, name, handleChange }) {

    const [input, setInput] = useState("")
    return (
        <label style={{ display: "flex", flexDirection: "column" }}>
            {label}:
            <div style={{ height: "1rem" }} />
            <input style={{ width: "90%", height: "100%" }} type="text" name={name} value={input}
                onChange={(event) => {
                    setInput(event.target.value);
                    handleChange(name, event.target.value)
                }} />
        </label>
    )
}

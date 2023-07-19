import React from "react";
import { useState } from "react";
import "./Form.css"

function Form() {

    // const [formValues, setFormValues] = useState({});
    // const handleChange = (e) => {
    //   setFormValues({ ...formValues, [e.target.id]: e.target.value });
    // };
    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   console.log(formValues);
    // };

    const [formValues, setFormValues] = useState({});

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.id]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues)
    }
    return (
        <>
            <div className="App">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={formValues.name || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={formValues.email || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>
        </>
    )

}

export default Form;
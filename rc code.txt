import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { isRouteErrorResponse } from "react-router-dom";

function RegistrationForm() {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [countryData, setCountrydata] = useState([]);
    const [stateData, setStatedata] = useState([]);
    const [message, setMessage] = useState("");

    const handleCountry = async (e) => {
        const getCountryid = e.target.value;
        console.log(getCountryid)
        const reqStatedata = await fetch("http://localhost:7000/api/state/" + getCountryid);
        const resStatedata = await reqStatedata.json();
        setStatedata(resStatedata);
        console.log(resStatedata);
    }

    useEffect(() => {
        const getCountry = async () => {
            const reqData = await fetch("http://localhost:7000/api/country ");
            const resData = await reqData.json();
            setCountrydata(resData);
        }
        getCountry();
    }, [])
    const onSubmit = async (data) => {
        console.log(data);
        const res = axios.post("http://localhost:7000/api/adduser", data).then(
            responce => {
                setMessage(responce.data);
            });
        if (!message) {
            setMessage(res.data);
            setTimeout(() => {
                navigate('/Userlisting')
            }, 2000); 
        }
        else {
            setMessage("some error occured!");
        }
    }
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="mt-2"> User list</h5>

                        <p className="tex-success">{message}</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-lable">Name <span className="text-danger">*</span></label>
                                        <input type="text" {...register("name", { required: true })} className="form-control" />
                                        <span className="text-danger">
                                            {errors.name?.type === "required" && "Name is  Required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-lable">User Name<span className="text-danger">*</span></label>
                                        <input type="text" {...register("username", { required: true, pattern: /^[a-zA-Z0-9_]+$/i, })} className="form-control" />
                                        <span className="text-danger">
                                            {errors.username?.type === "required" && "Username is Required"}
                                            {errors.username?.type === "pattern" && "username is wrong"
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-lable">Email<span className="text-danger">*</span></label>
                                        <input type="email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i })} className="form-control" />
                                        <span className="text-danger">
                                            {errors.email?.type === "required" && "email is required"}
                                            {errors.email?.type === "required " && "email format is wrong"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-lable">Password<span className="text-danger">*</span></label>
                                        <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 20 })} className="form-control" />
                                        <span className="text-danger">
                                            {errors.password?.type === "required" && "password is required"}
                                            {errors.password?.type === "minLength" && "password is too short"}
                                            {errors.password?.type === "maxLength" && "password is too long"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-lable">Phone No<span className="text-danger">*</span></label>
                                        <input type="number" {...register("phonenum", { required: true, minLength: 6, maxLength: 12 })} className="form-control" />
                                        <span className="text-danger">
                                            {errors.phonenum?.type === "required" && "Phone NO is required"}
                                            {errors.phonenum?.type === "minLength" && "Phone No is too short"}
                                            {errors.phonenum?.type === "maxLength" && "phone No is too long"}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-lable">Gender<span className="text-danger">*</span></label>
                                        <select name="gender"{...register("gender", { required: true })} className="form-control">
                                            <option value="">--Please Select-- </option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Others">Others</option>
                                        </select>
                                        <span className="text-danger">
                                            {errors.gender?.type === "required" && "Gender is Required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-lable">Country<span className="text-danger">*</span></label>
                                        <select name="countryid" {...register("countryid", { required: true })} className="form-control" onChange={handleCountry}>
                                            <option value="">--Please Select--</option>
                                            {
                                                countryData.map((countryitem, index) => (
                                                    <option value={countryitem.id} key={index}>{countryitem.name}</option>
                                                ))
                                            }
                                        </select>
                                        {stateData.length === 0 && (
                                            <span className="text-danger">
                                                {errors.countryid?.type === "required" && "Country is required"}
                                            </span>
                                        )
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-lable">State<span className="text-danger">*</span></label>
                                        <select name="stateid" {...register("stateid", { required: true })} className="form-control">
                                            <option value="">--Please Select--</option>
                                            {
                                                stateData.map((stateitem, index) => (
                                                    <option value={stateitem.state_id} key={index}>{stateitem.state_name}</option>
                                                ))
                                            }
                                        </select>
                                        <span className="text-danger">
                                            {errors.stateid?.type === "required" && "State is required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-lable">Address 1<span className="text-danger">*</span></label>
                                        <textarea name="address1" {...register("address1", { required: true })} className="form-control" />
                                        <span className="text-danger">
                                            {errors.address1?.type === "required" && "Address is required "}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-lable">Address 2</label>
                                        <textarea name="address2" {...register("address2")} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <div className="form-check form-check-input">
                                            <input type="checkbox" name="accept" {...register("accept", { required: true })} className="form-check-input" value="1" />
                                            <label className="form-checklable">Accept all conditions</label>
                                            <span className="text-danger">
                                                {errors.accept?.type === "required" && "Accept is required"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-lable"></label>
                                        <button type="submit" className="btn btn-success btn-lg">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </React.Fragment >
    );
}

export default RegistrationForm;
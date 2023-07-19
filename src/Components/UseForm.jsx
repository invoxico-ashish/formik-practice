import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import "./UseForm.css"
import * as Yup from "yup"
import FormErr from './FormErr'
// import { findByPlaceholderText } from '@testing-library/react'


const initialValues = {
    name: "",
    email: "",
    channel: "",
    comments: "",
    address: "",
    social: {  // addiong of neasted object here 
        facebook: "",
        twitter: "",
    },
    PhoneNumber: ["", ""], //working with aarray 
    PhNum: [""],
}
const onSubmit = values => {
    console.log("Form data", values)
}
// const validate = values => {
//     let errors = {}

//     if (!values.name) {
//         errors.name = "Required"
//     }
//     if (!values.email) {
//         errors.email = "Required"
//     } else if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
//         errors.email = "Invalid email"
//     }
//     if (!values.channel) {
//         errors.channel = "Required"
//     }
//     return errors;
// }
const VAlidationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("invalid format").required("Required"),
    channel: Yup.string().required("Required"),
    address:Yup.string().required("Required"),
})
function UseForm() {
    // const formik = useFormik({
    //     initialValues,
    //     onSubmit,
    //     VAlidationSchema,

    //     // validate,
    // })
    // console.log("Form err", formik.errors)s
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={VAlidationSchema} >
            <div className='container'>
                <Form >
                    <div className='form-control'>
                        <label htmlFor="">Name</label>
                        <Field
                            type="text"
                            name="name"
                            placeholder='Name' />
                        <ErrorMessage name='name' component={FormErr} />
                        {/* FormErr will change the color of error */}
                    </div>
                    <div className='form-control'>
                        <label htmlFor="">E-mail</label>
                        <Field
                            type="text"
                            name="email"
                            placeholder='email' />
                        <ErrorMessage name="email">
                            {
                                (errorMsg) => <div className='error '>{errorMsg}</div>
                                // the above line is also give color to error this is another way
                            }
                        </ErrorMessage>
                    </div>
                    <div className='form-control'>
                        <label htmlFor="">channel</label>
                        <Field
                            type="text"
                            name="channel"
                            placeholder='channel' />
                        <ErrorMessage name="channel"component={FormErr}/>
                    </div>
                    <div className='form-control'>
                        <label htmlFor="">comments</label>
                        <Field
                            as="textarea"
                            name="comments"
                            placeholder='comments' />
                        <ErrorMessage name="comments" component={FormErr} />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="">Addess</label>
                        <Field name="address">
                            {
                                (props) => {
                                    const { field, meta, form } = props
                                    console.log("prop render here", props)
                                    return (
                                        <div>
                                            <input type="text" id="address" {...field} />
                                            {meta.touched && meta.error ? <div>{meta.error}</div> : null}

                                        </div>
                                    )
                                }
                            }

                        </Field>
                        <ErrorMessage name='address' component={FormErr} />
                    </div>

                    {/* neasted object */}
                    <div className='form-control'>
                        <label htmlFor="">Facobook Profile</label>
                        <Field
                            type="text"
                            id="facebook"
                            name="social.facebook"
                        />
                            <ErrorMessage name='social.facebook' component={FormErr} />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="">Twitter Profile</label>
                        <Field
                            type="text"
                            id="twitter"
                            name="social.twitter" //show see the difference between neasted obj see console after submision of form 
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="">Primary Phone number</label>
                        <Field
                            type="text"
                            id="primaryPh"
                            name="PhoneNumber[0]"
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="">Secondary Phone number</label>
                        <Field
                            type="text"
                            id="SecondaryPh"
                            name="PhoneNumber[1]"
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="">Phone no list </label>
                        <FieldArray name="PhNum">
                            {
                                fldarrProp => {
                                    console.log(fldarrProp);
                                    const { push, remove, form } = fldarrProp;
                                    const { values } = form;
                                    const { PhNum } = values
                                    return (
                                        <div>
                                            {
                                                PhNum.map((phno, index) => (
                                                    <div key={index}>
                                                        <Field name={`PhNum[${index}]`} />
                                                        {
                                                            index > 0 && (
                                                                <button type='button' onClick={() => remove(index)}>-</button>
                                                            )
                                                        }

                                                        <button type="button" onClick={() => push("")}>+</button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            }
                        </FieldArray>
                    </div>
                    <button type="submit">Submit</button>

                </Form>
            </div>
        </Formik>
    )
}

export default UseForm
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

// ErrorMessage Component
const ErrorMessage = ({ errors, touched }) => (
  <div className="error-messages">
    {Object.keys(errors).map((field) => {
      if (touched[field] && errors[field]) {
        return (
          <p key={field} className="error-message">
            {errors[field]}
          </p>
        );
      }
      return null;
    })}
  </div>
);

const Checkout = () => {
  const navigate = useNavigate();

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(20, "First name must not exceed 20 characters")
      .matches(/^[a-zA-Z]+$/, "First name must only contain letters")
      .required("First name is required"),
    lastName: Yup.string()
      .max(20, "Last name must not exceed 20 characters")
      .matches(/^[a-zA-Z]+$/, "Last name must only contain letters")
      .required("Last name is required"),
    email: Yup.string()
      .email("Email is invalid")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    address: Yup.string()
      .max(50, "Address must not exceed 50 characters")
      .required("Address is required"),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      navigate("/success"); // Redirect to success page
    },
  });

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form onSubmit={formik.handleSubmit} className="checkout-form">
        <div className="form-field">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
        </div>

        <div className="form-field">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
        </div>

        <div className="form-field">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
        </div>

        <ErrorMessage errors={formik.errors} touched={formik.touched} />

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Checkout;

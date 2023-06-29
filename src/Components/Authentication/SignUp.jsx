import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../Services/ApiUrls";
import { CustomAlert } from "../customAlerts/customAlert";
import { actionCreators } from "../../Redux/actionCreators/index";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

export const SignUp = () => {
  const navigate = useNavigate();
  const formikRed = useRef();
  // to pass user in redux state
  const dispatch = useDispatch();
  const { userLogIn } = bindActionCreators(actionCreators, dispatch);
  // to disable button while submitting the form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState();
  const initialValues = {
    email: "",
    name: "",
    password: "",
    confirm_password: "",
    profile_pic: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("This Field is required"),
    name: Yup.string().required("This Field is required"),
    password: Yup.string()
      .min(4, "Password should contains min 4 characters")
      .required("This Field is required"),
    confirm_password: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "Confirm password should be equal to password"
      )
      .required("This Field is required"),
  });

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert({});
    }, 2000);
  };

  const onSubmit = async (fields, setFieldValue) => {
    setIsSubmitting(true);
    try {
      let res = await API_URLS.userSignUp(fields);
      // saving user data in redux state
      //   userLogIn(res.data);
      showAlert("User created Successfully", "success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      let err =
        typeof error.message === "object"
          ? "Some error occurred"
          : error.message;
      showAlert(err, "danger");
    }
    setIsSubmitting(false);
  };

  const UploadProfilePic = async (e, values, setFieldValue) => {
    setIsSubmitting(true);
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("name", file.name);
    const res = await API_URLS.uploadProfilePic(data);
    if (res.isSuccess) {
      setFieldValue("profile_pic", res?.data?.imageUrl);
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      {alert && <CustomAlert alert={alert} />}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched, values, setFieldValue }) => {
          return (
            <Form className="d-flex flex-column">
              <div className="m-3">
                <label className="form-label text-lefts">Email *</label>
                <Field
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="m-3">
                <label className="form-label text-lefts">Name *</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  className={
                    "form-control" +
                    (errors.name && touched.name ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="m-3">
                <label className="form-label">Password *</label>
                <Field
                  type="text"
                  name="password"
                  placeholder="Enter Password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="m-3">
                <label className="form-label">Confirm Password *</label>
                <Field
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  className={
                    "form-control" +
                    (errors.confirm_password && touched.confirm_password
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="confirm_password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              {values.profile_pic && (
                <img
                  style={{
                    width: "80%",
                    objectFit: "cover",
                    aspectRatio: "1",
                    margin: "auto",
                  }}
                  src={values.profile_pic}
                  alt="profile pic"
                />
              )}
              <div className="m-3">
                {/* <label className="form-label">Profile Pic *</label> */}
                <label
                  htmlFor="imginput"
                  className="form-lable d-flex justify-content-center"
                >
                  <ImageSearchIcon fontSize="large" /> Upload a new profile pic
                </label>
                <Field
                  type="file"
                  name="slected_file"
                  id="imginput"
                  placeholder="Profile Pic"
                  style={{ display: "none" }}
                  onChange={(e) => UploadProfilePic(e, values, setFieldValue)}
                  className={
                    "form-control" +
                    (errors.profile_pic && touched.profile_pic
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="profile_pic"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <button
                className="m-4 btn btn-primary"
                disabled={isSubmitting}
                type="submit"
              >
                Sign Up
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

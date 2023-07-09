import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../Services/ApiUrls";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../Redux/actionCreators/index";
import { bindActionCreators } from "redux";
import { CustomAlert } from "../customAlerts/customAlert";

export const LogIn = () => {
  const navigate = useNavigate();
  // to pass user in redux state
  const dispatch = useDispatch();
  const { userLogIn } = bindActionCreators(actionCreators, dispatch);
  // to disable button while submitting the form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState();
  const initialValues = {
    email: "",
    password: "",
  };

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert({});
    }, 2000);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("This Field is required"),
    password: Yup.string().required("This Field is required"),
  });

  const onSubmit = async (fields, setFieldValue) => {
    setIsSubmitting(true);
    try {
      let res = await API_URLS.userLogIn(fields);
      // saving user data in redux state
      userLogIn(res.data);
      showAlert("Logged in Successfully", "success");
      setTimeout(() => {
        navigate("/home");
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
  return (
    <div>
      {alert && <CustomAlert alert={alert} />}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched, fields, setFieldValue }) => {
          return (
            <Form className="d-flex flex-column">
              <div className="m-3">
                <label className="form-label text-lefts">Email *</label>
                <Field
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  style={{ backgroundColor: "inherit" }}
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
                <label className="form-label">Password *</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  style={{ backgroundColor: "inherit" }}
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
              <button
                className="m-4 btn btn-primary"
                disabled={isSubmitting}
                type="submit"
              >
                Log In
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

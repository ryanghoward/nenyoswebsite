import React, { useEffect, useRef, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";

import "../CSS Files/Login.css";

import axios from "../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, pwd, roles, accessToken });
      setEmail("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div id='login-page-wrapper'>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href='/user-profile'>Go to Profile</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errMsg" : "offscreen"}
            aria-live='assertive'
          >
            {errMsg}
          </p>
          <div className='container'>
            {/* <h1>Log In</h1> */}
            <form onSubmit={handleSubmit}>
              {/* <label htmlFor='email'>Email:</label> */}
              <input
                placeholder='   Email'
                type='email'
                id='email'
                ref={emailRef}
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              {/* <label htmlFor='password'>Password:</label> */}
              <input
                placeholder='   Password'
                type='password'
                id='password'
                autoComplete='off'
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <div className='button-container'>
                <button>Log In</button>
              </div>
              <div className='signup-link'>
                <p>
                  Need an Account?
                  {/* <br /> */}
                  {/* <span className='line'> */}
                  <a href='/signup'> Sign Up</a>
                  {/* </span> */}
                </p>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};

export default Login;

import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import Header from './../components/Header';
import axios from "axios";


const Register = () => {
  const history = useHistory();

  window.scrollTo(0, 0);
  let username;
  let email;
  let password;

  let handleSubmit = async (e) => {
    axios.post("http://localhost:5000/api/auth/registration", {
      username: username,
      email: email,
      password: password
    }).then(res => res.status === 200 ? history.push("/login/200") : window.location.reload())
  }
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            onChange={e => username = e.target.value}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={e => email = e.target.value}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => password = e.target.value}
          />

          <button type="submit">Register</button>
          <p>
            <Link to={'/login'}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;

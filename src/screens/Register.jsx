import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Header from './../components/Header';
import axios from "axios";


const Register = () => {
    const [registerMessageVisible, setRegisterMessageVisible] = useState(false);
    const [responseMessage, setResponseMessage] = useState("responseMessage");
    const [responseStatus, setResponseStatus] = useState(0);
    const [requestData, setRequestData] = useState({
      username: "",
      email: "",
      password: ""
    })

    const history = useHistory();

    window.scrollTo(0, 0);

    let handleSubmit = async (e) => {
        e.preventDefault()

        axios.post("https://platz-shop-api.onrender.com/api/auth/registration", {
            username: requestData.username,
            email: requestData.email,
            password: requestData.password
        })
            .then(res => {
                setResponseMessage(res.data.message)
                setResponseStatus(res.status)
                setRegisterMessageVisible(true)
              setRequestData({
                username: "",
                email: "",
                password: ""
              })
            })
            .catch(e => {
                setResponseMessage(e.response.data.message)
                setResponseStatus(e.response.status)
                setRegisterMessageVisible(true)
                console.log(e.response.data.message)
                console.log(e.response.status)
            })
    }
    return (
        <>
            <Header/>

            <div className="container d-flex flex-column justify-content-center align-items-center login-center gap-5">

                {registerMessageVisible
                    ? responseStatus === 200
                        ?
                        <div className="login__message message-success">You have been successfully registered. Please
                            Log in
                            to continue</div>
                        : responseStatus === 400
                            ? <div className="login__message message-alert">{responseMessage}</div>
                            : <div>IDK</div>
                    : null
                }

                <form className="Login col-md-8 col-lg-4 col-11" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={e => setRequestData({...requestData, username: e.target.value})}
                        value={requestData.username}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={e => setRequestData({...requestData, email: e.target.value})}
                        value={requestData.email}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={e => setRequestData({...requestData, password: e.target.value})}
                        value={requestData.password}
                    />

                    <button type="submit">Register</button>
                    <p>
                        <Link to={'/login/0'}>
                            I Have Account <strong>Login</strong>
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Register;

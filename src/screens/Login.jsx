import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import Header from "./../components/Header";
import Loader from "../components/utils/Loaders/Loader";
import {useFetching} from "../components/utils/CustomHooks/useFetching";
import axios from "axios";

const Login = ({match}) => {
    // window.scrollTo(0, 0);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [changeMessage, setChangeMessage] = useState(true);
    const [profileButtonVisible, setProfileButtonVisible] = useState(false);
    const history = useHistory();

    const [loginSend, isLoginSending, error] = useFetching(async () => {
        localStorage.clear()
        let res = await fetch("https://platz-shop-api.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        console.log(await res.status)
        if (await res.status === 200) {
            setChangeMessage(true)
            let resJson = await res.json();
            localStorage.setItem("token", resJson.token)
            localStorage.setItem("email", email)
            localStorage.setItem("username", resJson.username)
            localStorage.setItem("roles", JSON.stringify(resJson.roles))
            if (resJson.roles.includes("ADMIN"))
                history.push("/dashboard")
            else
                history.push("/")
        } else {
            setChangeMessage(false)
        }
        setEmail("")
        setPassword("")
        // console.log(resJson.token)
    })

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            loginSend()
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Header profileButtonVisible={profileButtonVisible}/>
            <div className="container d-flex flex-column justify-content-center align-items-center login-center gap-5">
                {changeMessage
                    ? match.params.status == 401
                        ? <div className="login__message">Please Login for this action</div>
                        : match.params.status == 403
                            ? <div className="login__message">Session was expired. Please Login for continue</div>
                            : null
                    : <div className="login__message message-alert">Incorrect login or password</div>
                }


                <form className="Login col-md-8 col-lg-4 col-11" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                    <p>
                        <Link to={"/register"}>Create Account</Link>
                    </p>
                </form>
                {
                    isLoginSending
                        ? <Loader/>
                        : null
                }

            </div>
        </>
    );
};

export default Login;

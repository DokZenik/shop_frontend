import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import Header from "./../components/Header";

const Login = () => {
    window.scrollTo(0, 0);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                }),
            });
            if (await res.status === 200) {
                let resJson = await res.json();
                localStorage.setItem("token", resJson.token)
                localStorage.setItem("username", email)
                history.push("/")
            }
            setEmail("")
            setPassword("")
            // console.log(resJson.token)
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Header/>
            <div className="container d-flex flex-column justify-content-center align-items-center login-center">
                <form className="Login col-md-8 col-lg-4 col-11" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                    <p>
                        <Link to={"/register"}>Create Account</Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Login;

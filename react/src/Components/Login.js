import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/login', {
                email: email,
                password: password,
            });
            if (res.data.success === true) {
                localStorage.setItem("isLoggedIn", true)
                localStorage.setItem("token", res.data.token)
                navigate("/dashboard")
                toast.success(' Login Suceesfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
            else {
                alert("Wrong credentils entered.")
            }
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">

            <div className="hero-body" style={{ backgroundImage: "url('https://cdn.wallpapersafari.com/55/73/ghY4rc.jpg')", }}>
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">


                            <form onSubmit={Auth} className="box" style={{ backgroundImage: "url('https://www.marshallsindia.com/ImageBuckets/ItemImages/ZA%201903.jpg?id=75')", }}>
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                </div>

                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="***********" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                </div>

                                <div className="field mt-5">
                                    <button className="button is-info is-fullwidth">Login</button><br />

                                </div>
                            </form>

                            <div> <a href="/Register">
                                <button className="button is-info is-fullwidth">Sign up</button></a>
                            </div>

                            <br />

                            <div> <a href="/Forget">
                                <button className="button is-info is-fullwidth">Forget Password</button></a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;




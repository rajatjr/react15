import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import cartIcon from '';


/// logout ///////

const Navbar = () => {
    const navigate = useNavigate();

    const Logout = async () => {
        try {
            localStorage.clear()
            navigate("/")
            toast.success(' Logout Succesfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            console.log(error);
        }
    }


    function changepassword() {
        navigate("/changepassword")
    }

    return (
        <nav className="navbar is-black" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">

                    <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="/" className="navbar-item">Home</a>
                    </div>
                    {/* 
                    <a href="/cart">
                        <img src={cartIcon} alt="Add to Cart" />
                    </a> */}


                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button onClick={Logout}  >
                                    Log Out
                                </button>

                            </div>

                            <div className="buttons">
                                <button onClick={changepassword} style={{ marginBottom: "24px", marginLeft: "10px" }} >
                                    change paasword
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
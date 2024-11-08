import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../eComponentCss/eloginForm.css';
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const EloginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onLogin = async () => {
        setLoading(true);
        setError(null);

        const loginId = 'adminyouth@gmail.com';
        const passwords = 'Admin@youth';

        try {
            if (email === loginId && password === passwords) {
                localStorage.setItem('eventadminLogin', true);
                toast.success("Login Successfully");
                navigate('/event/euserlist');
                setEmail("");
                setPassword("");
            }else{
                toast.error("Invalid email or password. Please try again.");
            }
        } catch (error) {
            toast.error("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="elogin_form_main ">
            <Toaster />
            <div className="elogin_form d-flex justify-content-center align-items-center px-sm-5 py-sm-5 px-0 col-lg-4 col-md-6 col-sm-9 col-12">
                <form className="app_form flex-column justify-content-between w-100">
                    <div>
                        <h5>Email Address</h5>
                        <input
                            type="email"
                            placeholder="Enter The Email Address"
                            name="email"
                            required
                            className="mb-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <h5>Password</h5>
                        <input
                            type="password"
                            placeholder="Enter The Password"
                            name="password"
                            required
                            className="mb-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button
                        type="button"
                        className="event_buttonX"
                        onClick={onLogin}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EloginForm;
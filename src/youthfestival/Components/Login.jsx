import { useState } from "react";
import "../ComponentsCSS/login.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FestivalLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // loginid = 'adminfip@gmail.com'
    // password = 'Admin@fip'

    const onLogin = async () => {
        setLoading(true);
        setError(null);

        const loginId = 'adminfip@gmail.com';
        const password = 'Admin@fip';
        try {
            if (email === loginId && password === password) {
                localStorage.setItem('adminLogin',true);
                navigate('/youthfestivalplus/applicationlist');
                return;
            }

            const response = await axios.get(`https://www.indianfilms.in/eFirstIndiaAPI/api/FestivalRegistration/FestivalLogin`, {
                params: {
                    pEmailId: email,
                    pPassword: password
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status == 200) {
                if (response.data.isSuccess == 200 && response.data.data.length > 0) {
                    localStorage.setItem('festivalRegId', response?.data?.data[0]?.festivalRegId);
                    localStorage.setItem('youthpaymentStatus', response?.data?.data[0]?.paymentStatus);
                    navigate('/youthfestivalplus/viewdetails')
                    setEmail("");
                    setPassword("");
                } else {
                    alert('You are not register');
                    navigate('/youthfestivalplus/applicationform')
                }
            }
        } catch (error) {
            setError("Please try again later.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="youthfestival">
            <Navbar />
            <div className="login_main d-flex justify-content-center p-5" style={{ background: '#fff' }}>
                <div className="card-contact px-sm-4 py-sm-4 px-2 py-3 login_form">
                    <h1>LOGIN</h1>
                    <div className="">
                        <input
                            type="email"
                            placeholder="Enter EmailId"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form_field">
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="login_button">
                        <button onClick={onLogin} disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                    {error && <div className="error">{error}</div>}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FestivalLogin;

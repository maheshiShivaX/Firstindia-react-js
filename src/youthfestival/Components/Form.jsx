import { useState, useEffect } from "react";
import "../ComponentsCSS/form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


const FestivalForm = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stateData, setStateData] = useState([]);
    const navigate = useNavigate();
    const [values, setValues] = useState(
        {
            school: "",
            choice: "",
            address: "",
            name: "",
            emailId: "",
            mobileNo: "",
            cordinatorName: "",
            cordinatorMobileNo: "",
            escortName: "",
            escortNumber: "",
            stateId: "",
            city: "",
            password: "",
            isActive: true,
            createdBy: 0
        });

    const getStateData = async () => {
        try {
            const response = await axios.get(`https://www.indianfilms.in/eFirstIndiaAPI/api/State/GetState`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setStateData(response?.data?.data);
            } else {
                setError("Failed to fetch product Data");
            }
        } catch (error) {
            setError("Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getStateData();
    }, []);

    const change = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };


    const submit = async () => {
        if (
            values.school === "" ||
            values.choice === "" ||
            values.address === "" ||
            values.name === "" ||
            values.emailId === "" ||
            values.mobileNo === "" ||
            values.cordinatorName === "" ||
            values.cordinatorMobileNo === "" ||
            values.escortName === "" ||
            values.escortNumber === "" ||
            values.stateId === "" ||
            values.city === "" ||
            values.password === "" ||
            values.isActive === ""
        ) {
            alert("All Fields Are Required");
        } else {
            try {
                // const res = await axios.post("http://localhost:4000/api/v1/post", values);
                const response = await axios.post("https://www.indianfilms.in/eFirstIndiaAPI/api/FestivalRegistration/SaveFestivalRegistration", values);


                // Access the response data
                if (response.status == 200) {
                    if (response.data.isSuccess == 200) {
                        localStorage.setItem('festivalRegId', response?.data?.data?.festivalRegId)
                        navigate('/youthfestivalplus/viewdetails');
                    }
                } else {
                    alert("Error in processing the payment");
                }

            } catch (error) {
                // console.error("Error submitting form:", error);
                alert("There was an error submitting the form");
            } finally {
                setValues({
                    school: "",
                    choice: "",
                    address: "",
                    name: "",
                    emailId: "",
                    mobileNo: "",
                    cordinatorName: "",
                    cordinatorMobileNo: "",
                    escortName: "",
                    escortNumber: "",
                    stateId: "",
                    city: "",
                    password: "",
                    isActive: true,
                    createdBy: 0
                });
            }
        }
    };



    return (
        <>
            <Navbar />
            <div className="youthfestival">
                <div className="main d-flex justify-content-center align-items-center p-5" style={{ background: '#fff' }}>
                    <div className="card-contact px-3 py-2">
                        <h1>REGISTRATION FORM</h1>
                        <hr />
                        <div className="cont-form flex-column justify-content-between">
                            <div>
                                <h5>Name of the Institution</h5>
                                <input
                                    type="text"
                                    placeholder="Enter The Name"
                                    name="school"
                                    value={values.school}
                                    onChange={change}
                                />
                            </div>
                            <div>
                                <h5>School or College?</h5>
                                {/* <input
                                    type="text"
                                    placeholder="School or College"
                                    name="choice"
                                    value={values.choice}
                                    onChange={change}
                                /> */}
                                <div className="select_button">
                                    <label>
                                        <input
                                            type="radio"
                                            name="choice"
                                            value="School"
                                            checked={values.choice === 'School'}
                                            onChange={change}
                                        />
                                        School
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="choice"
                                            value="College"
                                            checked={values.choice === 'College'}
                                            onChange={change}
                                        />
                                        College
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h5>Address</h5>
                                <textarea
                                    placeholder="Enter The Address"
                                    name="address"
                                    value={values.address}
                                    onChange={change}
                                />
                            </div>
                            <div>
                                <h5>Name of the Institution Head</h5>
                                <input
                                    type="text"
                                    placeholder="Enter The Name of the Principal"
                                    name="name"
                                    value={values.name}
                                    onChange={change}
                                />
                            </div>
                            <div>
                                <h5>Email ID</h5>
                                <input
                                    type="text"
                                    placeholder="Enter Your Email ID"
                                    name="emailId"
                                    value={values.emailId}
                                    onChange={change}
                                />
                            </div>
                            <div>
                                <h5>Contact Number</h5>
                                <input
                                    type="text"
                                    placeholder="Contact Number"
                                    name="mobileNo"
                                    value={values.mobileNo}
                                    onChange={change}
                                    maxLength={10}
                                />
                            </div>
                            <div>
                                <h5>Name of the Co-Ordinator</h5>
                                <input
                                    type="text"
                                    placeholder="Enter The Name"
                                    name="cordinatorName"
                                    value={values.cordinatorName}
                                    onChange={change}
                                />
                            </div>
                            <div>
                                <h5>Contact Number of the Co-Ordinator</h5>
                                <input
                                    type="text"
                                    placeholder="Contact Number"
                                    name="cordinatorMobileNo"
                                    value={values.cordinatorMobileNo}
                                    onChange={change}
                                />
                            </div>
                            <div>
                                <h5>Name of the Escort Teacher</h5>
                                <input
                                    type="text"
                                    placeholder="Enter The Name"
                                    name="escortName"
                                    value={values.escortName}
                                    onChange={change}
                                />
                            </div>
                            <div>
                                <h5>Contact Number of the Escort Teacher</h5>
                                <input
                                    type="text"
                                    placeholder="Enter The Contact Number"
                                    name="escortNumber"
                                    value={values.escortNumber}
                                    onChange={change}
                                />
                            </div>
                            <div className="selection_option">
                                <h5>State</h5>
                                <select
                                    name="stateId"
                                    id="state"
                                    className="form-control"
                                    value={values.stateId}
                                    onChange={change}
                                    required
                                >
                                    <option value="0" className="option">Select state</option>
                                    {stateData?.map((state, i) => (
                                        <option key={state.stateId} value={state.stateId} className="option">{state?.stateName}</option>
                                    ))}
                                </select>
                                {/* <input
                                id="stateId"
                                type="text"
                                placeholder="Enter The City"
                                name="stateId"
                                value={values.stateId}
                                onChange={change}
                            /> */}
                            </div>
                            <div>
                                <h5>City</h5>
                                <input
                                    id="imp"
                                    type="text"
                                    placeholder="Enter The City"
                                    name="city"
                                    value={values.city}
                                    onChange={change}
                                />
                            </div>
                            <div>
                                <h5>Password</h5>
                                {/* <input
                                id="password"
                                type="text"
                                placeholder="Enter Password"
                                name="passowrd"
                                value={values.password}
                                onChange={change}
                            /> */}
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter Password"
                                    name="password"
                                    value={values.password}
                                    onChange={change}
                                    className="passward_field"
                                />
                            </div>
                        </div>
                        <button className="buttonX" onClick={submit}>Submit</button>
                    </div >
                </div >
            </div>
            <Footer />
        </>
    )
}

export default FestivalForm; 
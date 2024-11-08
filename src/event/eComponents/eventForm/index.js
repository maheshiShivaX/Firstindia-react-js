import '../../eComponentCss/eventForm.css';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from 'react';
import { baseAPIURL } from '../../../_config';
import { registerEvent } from '../../../_services';
import { ClipLoader } from 'react-spinners';
import { Toaster } from 'react-hot-toast';

const EventForm = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Set initial loading to false
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const uId = pathname.split('/').pop();

    const [values, setValues] = useState({
        loginId: uId,
        name: '',
        dob: '',
        mobileNo: '',
        gender: '',
        emailId: '',
        city: ''
    });

    // Validate  EmailId
    const validateEmail = (email) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
        return isValid;
    };

    // Validate phone number
    const validatePhoneNumber = (phone) => {
        const isValid = /^\d{10}$/.test(phone) && parseInt(phone[0], 10);
        return isValid;
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // const numericValue = value.replace(/[^0-9]/g, '');

        // // Ensure the input is a maximum of 10 digits
        // setValues((prevValues) => ({
        //     ...prevValues,
        //     [name]: numericValue.length <= 10 ? numericValue : prevValues.mobileNo,
        // }));

        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    // Handle gender selection
    const handleGenderChange = (e) => {
        setValues((prevValues) => ({
            ...prevValues,
            gender: e.target.value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setLoading(true); // Start loading spinner

        // Validate form fields
        if (
            !values.name ||
            !values.dob ||
            !values.mobileNo ||
            !values.gender ||
            !values.emailId ||
            !values.city
        ) {
            alert("All fields are required!");
            setLoading(false);
            return;
        }

        if (!validateEmail(values.emailId)) {
            alert("Please Enter valid Email Address!");
            setLoading(false);
            return;
        }

        // Validate phone number
        if (!validatePhoneNumber(values.mobileNo)) {
            alert("You can enter only numbers.");
            setLoading(false);
            return;
        }

        try {
            // Use the registerEvent function from the service
            const response = await registerEvent(values);

            if (response.status === 200) {
                if (response.data.isSuccess === 200) {
                    toast.success("Registration successful!");
                    navigate('/event/eformthankyou');
                } else {
                    toast.error(response.data.message || 'Something went wrong!');
                }
            } else {
                toast.error("Network issue! Please try again");
            }
        } catch (error) {
            toast.error("There was an error submitting the form");
        } finally {
            setLoading(false); // Stop loading spinner
            // Reset form values on successful submit or error
            setValues({
                name: '',
                dob: '',
                mobileNo: '',
                gender: '',
                emailId: '',
                city: ''
            });
        }
    };

    return (
        <div className="event_main">
            <Toaster />
            <div className="d-flex justify-content-center align-items-center px-sm-5 py-sm-5 px-0 col-xl-4 col-lg-5 col-md-6 col-sm-9 col-12">
                <div className="event_form px-4 pb-4 w-100">
                    <div className="form_logo text-center">
                        <img src="./festivalimages/Logo.png" alt="" style={{ height: '100px' }} />
                    </div>
                    <h3 className="eform_heading text-center">REGISTRATION FORM</h3>
                    <hr />
                    <form className="app_form flex-column justify-content-between" onSubmit={onSubmit}>
                        <div>
                            <h5>Name</h5>
                            <input
                                type="text"
                                placeholder="Enter The Name"
                                name="name"
                                required
                                value={values.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <h5>Email Address</h5>
                            <input
                                type="email"
                                placeholder="Enter The Email Address"
                                name="emailId"
                                required
                                value={values.emailId}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <h5>Mobile No.</h5>
                            <input
                                type="text"
                                placeholder="Enter The Mobile Number"
                                name="mobileNo"
                                required
                                value={values.mobileNo}
                                maxLength={10}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="gender_field_sec">
                            <h5>Gender</h5>
                            <div className="d-sm-flex" style={{ gap: '15px' }}>
                                <label>
                                    <input
                                        className="gender_input"
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={values.gender === 'Male'}
                                        onChange={handleGenderChange}
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        className="gender_input"
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={values.gender === 'Female'}
                                        onChange={handleGenderChange}
                                    />
                                    Female
                                </label>
                                <label>
                                    <input
                                        className="gender_input"
                                        type="radio"
                                        name="gender"
                                        value="Other"
                                        checked={values.gender === 'Other'}
                                        onChange={handleGenderChange}
                                    />
                                    Other
                                </label>
                            </div>
                        </div>
                        <div>
                            <h5>DOB</h5>
                            <input
                                type="date" // Change from type="text" to type="date"
                                placeholder="Enter The Date of Birth"
                                name="dob"
                                required
                                value={values.dob}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <h5>City</h5>
                            <input
                                type="text"
                                placeholder="Enter The City"
                                name="city"
                                required
                                value={values.city}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/* Submit Button with Loader */}
                        <button
                            type="submit"
                            className="event_buttonX"
                            disabled={loading} // Disable when loading
                        >
                            {loading ? (
                                <ClipLoader color="#fff" size={20} />
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </form>
                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default EventForm;

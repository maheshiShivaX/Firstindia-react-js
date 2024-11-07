import '../../eComponentCss/eventForm.css';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from 'react';
import { baseAPIURL } from '../../../_config';
import { registerEvent } from '../../../_services';

const EventForm = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const uId = pathname.split('/').pop();

    const [values, setValues] = useState(
        {
            loginId: uId,
            name: '',
            dob: '',
            mobileNo: '',
            gender: '',
            emailId: '',
            city: ''
        });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
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

        // Validate form fields
        if (
            values.loginId === 0 ||
            values.name === "" ||
            values.dob === "" ||
            values.mobileNo === "" ||
            values.gender === "" ||
            values.emailId === "" ||
            values.city === ""
        ) {
            alert("All Fields Are Required");
        } else {
            try {
                // Use the registerEvent function from the service
                const response = await registerEvent(values);

                if (response.status === 200) {
                    if (response.data.isSuccess === 200) {
                        console.log(response, 'response');
                        navigate('/event/eformthankyou');
                    } else if (response.data.isSuccess === 404) {
                        alert(response.data.message);
                    } else {
                        toast.error('Please try again');
                    }
                } else {
                    alert("Network issue! Please try again");
                }
            } catch (error) {
                alert("There was an error submitting the form");
            } finally {
                // Reset form values
                setValues({
                    name: '',
                    dob: '',
                    mobileNo: '',
                    gender: '',
                    emailId: '',
                    city: ''
                });
            }
        }
    };

    return (
        <div className='event_main'>
            <div className="d-flex justify-content-center align-items-center px-sm-5 py-sm-5 px-0 col-xl-4 col-lg-5 col-md-6 col-sm-9 col-12">
                <div className="event_form px-4 pb-4 w-100">
                    <div className='form_logo text-center'>
                        <img src='./festivalimages/Logo.png' alt='' style={{ height: '100px' }} />
                    </div>
                    <h3 className='eform_heading text-center'>REGISTRATION FORM</h3>
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
                        <div className='gender_field_sec'>
                            <h5>Gender</h5>
                            <div className='d-sm-flex' style={{ gap: '15px' }}>
                                <label>
                                    <input
                                        className='gender_input'
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={values.gender === 'Male'}
                                        onChange={handleGenderChange}
                                    />
                                    Male
                                </label>

                                {/* Female radio button */}
                                <label>
                                    <input
                                        className='gender_input'
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
                                        className='gender_input'
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
                        {/* <div>
                            <h5>DOB</h5>
                            <input
                                type="text"
                                placeholder="Enter The Date of Barth"
                                name="dob"
                                required
                                value={values.dob}
                                onChange={handleInputChange}
                            />
                        </div> */}

                        <div>
                            <h5>DOB</h5>
                            <input
                                type="date"  // Change from type="text" to type="date"
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
                        <button type='submit' className="event_buttonX">Submit</button>
                    </form>
                </div >
            </div >
        </div>
    )
}

export default EventForm;
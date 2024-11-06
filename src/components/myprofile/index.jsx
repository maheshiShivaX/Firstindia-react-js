import React, { useState, useEffect } from "react";
import Layout from "../layout/layout";
import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;

const MyProfile = () => {
    const [getUserProfile, setUserGetProfile] = useState([]);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userid');
    // console.log(userId, "ghvygbh")

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.post(`${baseUrl}get_profile`, { id: userId });
                if(response.data.status === 200){
                    setUserGetProfile(response.data.result[0]);
                }
            } catch (error) {
                setError("Failed to fetch sections. Please try again later.");
            }
        };
        getProfile();
    }, [userId]);


    return (
        <Layout>
            <div className="container-screen">
                <div className="d-flex justify-content-center mt-5 pt-5">
                    <div className="profile-data text-white">
                        <div className="text-center">
                            <h1 className="">My Profile</h1>
                        </div>
                        <div className="content mt-4">
                            {/* <div className="profile-content">
                                <h5>Name :</h5>
                                <span>{getUserProfile?.name}</span>
                            </div>
                            <div className="profile-content">
                                <h5>Email Id :</h5>
                                <span>{getUserProfile?.email}</span>
                            </div> */}
                            <div className="profile-content">
                                <h5>Mobile No :</h5>
                                <span>{getUserProfile?.mobile}</span>
                            </div>
                            <div className="profile-content">
                                <h5>Subscription Status :</h5>
                                <span>{getUserProfile?.is_buy === 0 ? "Non Subscribed User" : "Subscribed User"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </Layout>
    )
}

export default MyProfile;
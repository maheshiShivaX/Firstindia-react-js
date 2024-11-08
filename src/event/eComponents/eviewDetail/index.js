import { useNavigate, useLocation } from "react-router-dom";
import '../../eComponentCss/eviewdetail.css';
import { getUserDetail, updateStatusFestRegistrationById } from '../../../_services';
import { useEffect, useState } from 'react';

const EviewDetail = () => {
    const [showLoader, setShowLoader] = useState(true);
    const [userDetail, setUserDetail] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const uId = pathname.split('/').pop();

    const fetchUserDetail = async () => {
        setLoading(true);
        try {
            const data = await getUserDetail(uId);
            if (data.length > 0 && data !== null) {
                setUserDetail(data[0]);
            } else {
                setError("No user detail found.");
            }
        } catch (error) {
            setError("Error fetching user detail.");
        } finally {
            setLoading(false);
        }
    };

    const onApproval = async (row) => {
        const isConfirmed = window.confirm("Are you sure you want to approve this?");

        if (isConfirmed) {
            try {
                setLoading(true);
                const response = await updateStatusFestRegistrationById(row.regId);
                fetchUserDetail();
            } catch (error) {
                setError("Error occurred while approving. Please try again.");
                // console.error('Approval error:', error);
            } finally {
                setLoading(false);
            }
        } else {
            // console.log("Approval canceled.");
        }
    };

    useEffect(() => {
        fetchUserDetail();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="eview_detail_main">
            {showLoader ? (
                <div class="event_loader">
                    <div class="e_loader_circle h-100">
                        <svg class="loader_circle_1 mx-auto d-block" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="loader_14">
                                <path id="Subtract" fillRule="evenodd" clipRule="evenodd" d="M40.6072 19.3943L51.2142 8.7873C45.3563 2.92943 37.6786 0.00050354 30.001 0.00050354L30.001 15C34.1431 15.0003 37.8929 16.6796 40.6072 19.3943Z" fill="#D4E5FF" />
                                <path id="Subtract_2" fillRule="evenodd" clipRule="evenodd" d="M44.9997 30.001L60.0004 30.001C60.0004 21.7167 56.6426 14.2167 51.2137 8.78778L40.6072 19.3943C43.3211 22.1087 44.9997 25.8583 44.9997 30C44.9997 30.0003 44.9997 30.0007 44.9997 30.001Z" fill="#AACBFF" />
                                <path id="Subtract_3" fillRule="evenodd" clipRule="evenodd" d="M40.6062 40.6068L51.2135 51.2142C57.0714 45.3563 60.0003 37.6786 60.0003 30.001H44.9998C44.9996 34.1428 43.3206 37.8926 40.6062 40.6068Z" fill="#80B2FF" />
                                <path id="Subtract_4" fillRule="evenodd" clipRule="evenodd" d="M40.6062 40.6067C37.8918 43.3211 34.142 44.9999 30 45L30 60.0005C38.2843 60.0005 45.7843 56.6426 51.2132 51.2137L40.6062 40.6067Z" fill="#5598FF" />
                                <path id="Subtract_5" fillRule="evenodd" clipRule="evenodd" d="M30.0003 45C30.0001 45 29.9999 45 29.9998 45C25.8579 45 22.1081 43.3213 19.3937 40.6071L8.78711 51.2137C14.645 57.0715 22.3226 60.0005 30.0003 60.0005V45Z" fill="#2B7EFF" />
                                <path id="Subtract_6" fillRule="evenodd" clipRule="evenodd" d="M14.9998 30.0002H0C0 38.2845 3.35786 45.7845 8.7868 51.2134L19.3934 40.6068C16.6788 37.8924 14.9998 34.1424 14.9998 30.0002Z" fill="#0064FF" />
                                <path id="Subtract_7" fillRule="evenodd" clipRule="evenodd" d="M19.3932 19.3933L8.78704 8.78711C2.92918 14.645 0.000244141 22.3226 0.000244141 30.0003H14.9998C14.9998 30.0002 14.9998 30.0001 14.9998 30C14.9998 25.8578 16.6787 22.1078 19.3932 19.3933Z" fill="#0053D5" />
                                <path id="Subtract_8" fillRule="evenodd" clipRule="evenodd" d="M30.0003 15V0C21.716 0 14.216 3.35786 8.78711 8.7868L19.3934 19.3931C22.1079 16.6788 25.8578 15 29.9998 15C29.9999 15 30.0001 15 30.0003 15Z" fill="#0043AA" />
                            </g>
                        </svg>
                    </div>
                </div>
            ) : (
                <>
                    <div className="eview_detail mt-5 pt-5 col-lg-4 col-md-6 col-sm-9 col-12">
                        <div className="user_detail_box">
                            <div className='form_logo text-center'>
                                <img src='./festivalimages/Logo.png' alt='' style={{ height: '100px' }} />
                            </div>
                            <h3 className="text-center mb-4">My Detail</h3>
                            <div className="user_event_data">
                                <span className="user_event_data_heading">Name :</span>
                                <span>{userDetail?.name}</span>
                            </div>
                            <div className="user_event_data">
                                <span className="user_event_data_heading">EmailId :</span>
                                <span>{userDetail?.emailId}</span>
                            </div>
                            <div className="user_event_data">
                                <span className="user_event_data_heading">Mobile No. :</span>
                                <span>{userDetail?.mobileNo}</span>
                            </div>
                            <div className="user_event_data">
                                <span className="user_event_data_heading">DOB :</span>
                                <span>{userDetail?.dob}</span>
                            </div>
                            <div className="user_event_data">
                                <span className="user_event_data_heading">Gender :</span>
                                <span>{userDetail?.gender}</span>
                            </div>
                            <div className="user_event_data">
                                <span className="user_event_data_heading">City :</span>
                                <span>{userDetail?.city}</span>
                            </div>
                            <div className="user_event_data">
                                <span className="user_event_data_heading">ApprovalStatus :</span>
                                {userDetail?.approvalStatus === 'Y' ? (
                                    <span className="approved">Approved</span>
                                ) : (
                                    <span className="panding">Pending</span>
                                )}
                            </div>
                            {/* {userDetail?.approvalStatus !== 'Y' ?
                                <div className="user_approve_button mt-3 text-center">
                                    <button onClick={() => onApproval(userDetail)}>Approve</button>
                                </div>
                                : null
                            } */}
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}

export default EviewDetail;
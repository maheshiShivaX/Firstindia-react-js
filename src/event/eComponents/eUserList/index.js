import '../../eComponentCss/euserlist.css';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { getUserList, updateStatusFestRegistrationById } from '../../../_services';
import toast from 'react-hot-toast';

const EuserList = () => {
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchUserList = async () => {
        setLoading(true);
        try {
            const data = await getUserList();
            if (data.length > 0) {
                setUserList(data);
            } else {
                setError("No user found.");
            }
        } catch (error) {
            setError("Error fetching user list.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserList();
    }, []);

    const onApproval = async (row) => {
        const isConfirmed = window.confirm("Are you sure you want to approve this?");

        if (isConfirmed) {
            try {
                setLoading(true);
                const response = await updateStatusFestRegistrationById(row.regId);
                toast.success("Approval Successfully");
                fetchUserList();
            } catch (error) {
                toast.error("Approval canceled. Please try again.");
            } finally {
                setLoading(false);
            }
        } else {
            toast.error("Approval canceled.");
        }
    };

    const onLogout = () =>{
        localStorage.removeItem('eventadminLogin');
        navigate('/event/eloginform');
    }

    const columns = [
        {
            name: 'SR.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '70px',
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            minWidth: '200px'
        },
        {
            name: 'Email ID',
            selector: row => row.emailId,
            sortable: true,
            minWidth: '260px'
        },
        {
            name: 'Mobile No',
            selector: row => row.mobileNo,
            sortable: true,
            minWidth: '200px'
        },
        {
            name: 'DOB',
            selector: row => row.dob,
            sortable: true,
            minWidth: '200px'
        },
        {
            name: 'Gender',
            selector: row => row.gender,
            sortable: true,
            minWidth: '200px'
        },
        {
            name: 'City',
            selector: row => row.city,
            sortable: true,
            minWidth: '200px'
        },
        {
            name: 'ApprovalStatus',
            cell: row => (
                <div className='d-flex align-items-center' style={{ gap: '8px' }}>
                    <p className='mb-0'>{row.approvalStatus}</p>
                    {row.approvalStatus === "P" ?
                        <p className='approve_btn mb-0' onClick={() => onApproval(row)} style={{ cursor: 'pointer' }}>Approve</p>
                        : null
                    }
                </div>
            ),
            sortable: true,
            minWidth: '150px'
        }
    ]

    return (
        <div className="euser_list_main">
            <div className="euser_list py-2 px-2">
                <div className='user_list d-flex justify-content-between'>
                    <h2 className=''>User List</h2>
                    <button onClick={onLogout} className='elogout_button'>Logout</button>
                </div>
                <div className='pt-2'>
                    <DataTable
                        columns={columns}
                        data={userList}
                        pagination
                        paginationPerPage={15}
                        highlightOnHover
                    />
                </div>
            </div>
        </div>
    )
}

export default EuserList;
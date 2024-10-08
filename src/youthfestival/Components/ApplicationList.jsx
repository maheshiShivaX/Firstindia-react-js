import React, { useEffect, useState } from 'react';
import "../ComponentsCSS/applicationlist.css";
import Navbar from './Navbar';
import Footer from './Footer';
import DataTable from 'react-data-table-component';
import { API_URL, baseurl,baseAPIURL } from '../../_config';
import axios from 'axios';
import { Link } from 'react-router-dom';

const dummyData = [
    {
        orderNo: 'ORD12345',
        orderDate: '2024-10-01',
        orderStatusType: 'Completed',
        orderStatusId: 3
    },
    {
        orderNo: 'ORD12346',
        orderDate: '2024-10-02',
        orderStatusType: 'Pending',
        orderStatusId: 1
    },
    {
        orderNo: 'ORD12347',
        orderDate: '2024-10-03',
        orderStatusType: 'Cancelled',
        orderStatusId: 2
    },
];

const ApplicationList = ({ applications }) => {
    const [applicationList, setApplicationList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getApplicationList = async () => {
        try {
            const response = await axios.get(`${baseAPIURL}${API_URL?.GetFestivalRegistrationAll}`);
            if (response.status == 200) {
                if (response.data.isSuccess == 200 && response.data.data.length > 0) {
                    setApplicationList(response?.data?.data);
                } else {
                    console.log('data not found')
                }
            } else {
                console.log('data fetch error')
            }
        } catch (error) {
            setError("Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        getApplicationList();
    },[]);


    const columns = [
        {
            name: 'SR.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '70px',
        },
        {
            name: 'Name of the Institution',
            selector: row => row.school,
            sortable: true,
            width:'200px'
        },
        {
            name: 'School or College',
            selector: row => row.choice,
            sortable: true,
            width:'200px'
        },
        {
            name: 'Address',
            selector: row => row.address,
            sortable: true,
            width:'200px'
        },
        {
            name: 'Name of the Institution Head',
            selector: row => row.name,
            sortable: true,
            width:'200px'
        },
        {
            name: 'Email ID',
            selector: row => row.emailId,
            sortable: true,
            width:'200px'
        },
        {
            name: 'Contact Number',
            selector: row => row.mobileNo,
            sortable: true,
            width:'200px'
        },
        {
            name: 'Name of the Co-Ordinator',
            selector: row => row.cordinatorName,
            sortable: true,
            width:'200px'
        },
        {
            name: 'Contact Number of the Co-Ordinator',
            selector: row => row.cordinatorMobileNo,
            sortable: true,
            width:'250px'
        },
        {
            name: 'Name of the Escort Teacher',
            selector: row => row.escortName,
            sortable: true,
            width:'250px'
        },
        {
            name: 'Contact Number of the Escort Teacher',
            selector: row => row.escortNumber,
            sortable: true,
            width:'280px'
        },
        {
            name: 'State',
            selector: row => row.stateName,
            sortable: true,
            width:'200px'
        },
        {
            name: 'City',
            selector: row => row.city,
            sortable: true,
            width:'200px'
        },
        {
            name: 'PaymentStatus',
            selector: row => row.paymentStatus,
            sortable: true,
            width:'150px'
        }
    ]

    return (
        <>
            {/* <Navbar /> */}
            <div className='application_main container-fluid py-4'>
                <div className='application_list d-flex justify-content-between'>
                    <h2 className=''>Application List</h2>
                    <Link to='/youthfestivalplus'  className=''>Logout</Link >
                </div>
                <div className='mt-4'>
                    <DataTable
                        columns={columns}
                        data={applicationList}
                        pagination
                        highlightOnHover
                    />
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default ApplicationList;

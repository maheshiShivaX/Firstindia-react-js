import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useRazorpay from "react-razorpay";
import { loadScript } from "@paypal/paypal-js";
import Layout from '../layout/layout';
const baseUrl = process.env.REACT_APP_BASE_URL;

const PaymentGateway = () => {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('3');
  const [payMethod, setPayMethod] = useState()
  const [error, setError] = useState(null);
  const userid = localStorage.getItem('userid');
  const mobile = localStorage.getItem('mobile');
  const [pIdModel, setPIdModel] = useState({})
  const [result, setResult] = useState()
  // f1030e958f32b462

  const [paymentdata, setPaymentData] = useState(null);
  const [isSuccess, setIsSuccess] = useState('');
  const [userId, setUserId] = React.useState('');

  const [Razorpay] = useRazorpay();

  const [form, setForm] = useState({
    customer_id: userid,
    customer_phone: mobile,
    package_id: '1',
    audition_id: '0',
    amount: '100',
    order_type: 'package',
    payment_option_id: selectedPaymentOption
  });

  const [paymentSessionId, setPaymentSessionId] = useState('');

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.post(`${baseUrl}payment_options`);
        if (response.status === 200) {
          setPayMethod(response.data.result);
          // console.log(response.data.result, "setPayMethod")
        } else {
          setError("Failed to fetch sections");
        }
      } catch (error) {
        setError("Failed to fetch sections. Please try again later.");
      }
    };

    fetchSections();

  }, []);

  const onCreateOrder = async () => {
    try {
      const response = await axios.post(`${baseUrl}create_order`, {
        customer_id: form.customer_id,
        customer_phone: form.customer_phone,
        amount: form.amount,
        order_type: form.order_type,
        package_id: form.package_id,
        audition_id: form.audition_id,
        payment_option_id: selectedPaymentOption
      });

      if (response.status === 200) {
        const result = response.data;
        // console.log(result, "result")
        if (selectedPaymentOption === "3") {
          loadRazorpayScript();
          const options = {
            key: result.key,
            amount: result.result.amount,
            currency: result.result.currency,
            name: result.result.name,
            description: result.result.description,
            image: result.result.image,
            order_id: result.result.order_id,
            prefill: result.result.prefill,
            theme: result.result.theme,
            callback_url: result.result.callback_url,
            notes: result.result.notes
          };
          // const rzp1 = new Razorpay(options);
          const paymentObject = new Razorpay(options);
          paymentObject.open();
        } else if (selectedPaymentOption === "2") {
          loadPaypalScript(response.data);
          setResult(response.data);
          // console.log(response.data)
        }
      } else {
        setError("Failed to create order");
      }
    } catch (error) {
      setError("Failed to create order. Please try again later.");
      // console.error('Error creating order:', error);
    }
  };

  const loadRazorpayScript = async () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }

  const loadPaypalScript = (datas) => {
    // console.log(result, "result")

    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              reference_id: result.order_id,
              amount: {
                value: '1.00',
                currency_code: 'USD'
              },
            },
          ],
        });
      },
      onApprove: async (data, actions) => {
        const captureResponse = await actions.order.capture();

        setPIdModel(prevState => ({
          ...prevState,
          response: captureResponse
        }));

        try {
          const result = await axios.post(`${baseUrl}update_order_status`, pIdModel);
          if (result.status === 200) {
            setPaymentData(result.data.result);
            if (result.data.result.payment_status === "1") {
              setUserId(result.data.result.user_id);
              setIsSuccess("S");
            } else {
              setUserId(result.data.result.user_id);
              setIsSuccess("F");
            }
          }
        } catch (error) {
          // console.error('Error updating order status:', error);
        }
      }
    }).render('#paypal-button-container');
  };

  const handleMethodSelection = (event) => {
    const methodId = event.target.value;
    setSelectedPaymentOption(methodId)
    // console.log('Selected payment method:', selectedPaymentOption);
  };

  if (!payMethod) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className='d-flex justify-content-center'>
        <div className='paymentgateway-main'>
          <div className='payment-heading text-white text-center'>
            <h2>Let's Make Payment</h2>
            <span>To start your subscription</span>
          </div>
          <div className='payment-option text-white d-flex my-4 py-2 justify-content-center'>
            <div className="method" >
              {Object.keys(payMethod).map((key) => (
                <label key={key} className="method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={key}
                    checked={selectedPaymentOption === key}
                    onChange={handleMethodSelection}
                  />
                  {payMethod[key]}
                </label>
              ))}
            </div>

            {/* <div className='method'>
              <span>
                <img src='images/3.png' />Razorpay
              </span>
            </div> */}
          </div>
          <div className='plan-amount text-white'>
            <div>
              <div className='amount-heading'>
                <p className='text-white mb-0'>You'r Paying</p>
                <h2>1Rs.</h2>
              </div>
              <div className='d-flex justify-content-between sidetext'>
                <p>Discounts and Offers</p>
                <p>0.00</p>
              </div>
              <div className='borderb'></div>
              <div className='d-flex justify-content-between mt-2 sidetext'>
                <p>Total</p>
                <p>1Rs.</p>
              </div>
            </div>
          </div>
          <div id="paypal-button-container" className='mt-3' style={{ width: "280px" }}></div>
          <div className='paybtn text-center mt-4'>
            <button onClick={onCreateOrder}>Pay Now</button>
          </div>
          {error && <p>{error}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default PaymentGateway;

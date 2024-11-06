import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, HashRouter, Switch, Redirect, Navigate } from "react-router-dom";
import ReactPWAInstallProvider, { useReactPWAInstall } from "react-pwa-install";
import Home from './components/home';
import Ott from './components/ott/ott';
import Videos from './components/ott/videos';
import Live from './components/livetv';
import Subscribtion from './components/subscribtion/subscribtion';
import PaymentGateway from './components/paymentgateway';
import TopTenVote from './components/toptenvote';
import Vote from './components/vote';
import MyProfile from './components/myprofile';
import AboutUs from './components/aboutus';
import Terms from './components/terms';
import PrivatePolicy from './components/privatepolicy';
import ReturnPolicy from './components/returnpolicy';
import Topvotelist from './components/topvotelist';
import FestivalHome from './youthfestival/Home'
import FestivalLogin from './youthfestival/Components/Login';
import FestivalForm from './youthfestival/Components/Form';
import FestivalPaymentSuccess from './youthfestival/Components/PaymentSuccess';
import FestivalViewDetails from './youthfestival/Components/ViewDetail';
import ApplicationList from './youthfestival/Components/ApplicationList';
// import PaymentReturn from './components/paymentreturn';

function RedirectToExternalUrl() {
  return <Navigate to="/downloads/" replace />
}

function App() {
  const adminLogin = localStorage.getItem('adminLogin')
  return (
    <>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="ott" element={<Ott />} />
          <Route exact path="videos" element={< Videos />} />
          <Route exact path="live" element={<Live />} />
          <Route exact path="subscribtion" element={<Subscribtion />} />
          <Route exact path="paymentgateway" element={<PaymentGateway />} />
          <Route exact path="public/topvotelist" element={<Topvotelist />} />
          <Route exact path="vote/:id" element={<Vote />} />
          <Route exact path="myprofile" element={<MyProfile />} />
          <Route exact path="public/aboutus" element={<AboutUs />} />
          <Route exact path="public/terms" element={<Terms />} />
          <Route exact path="public/privatepolicy" element={<PrivatePolicy />} />
          <Route exact path="public/returnpolicy" element={<ReturnPolicy />} />
          {/* <Route exact path="public/paymentreturn/:id" element={<PaymentReturn />} /> */}

          {/* youthfestival routs */}
          <Route path="youthfestivalplus" element={<FestivalHome />} />
          <Route path="/youthfestivalplus/viewdetails" element={<FestivalViewDetails />} />
          <Route path="/youthfestivalplus/login" element={<FestivalLogin />} />
          <Route path="/youthfestivalplus/applicationform" element={<FestivalForm />} />
          <Route path="/youthfestivalplus/paymentsuccess/:id" element={<FestivalPaymentSuccess />} />

          <Route path="/youthfestivalplus/applicationlist" element={<ApplicationList />} />
        </Routes >
      </HashRouter >
      <Router>
        <Routes>
          <Route path="/downloads" element={<RedirectToExternalUrl />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

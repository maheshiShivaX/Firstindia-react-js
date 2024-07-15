import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home';
import Ott from './components/ott/ott';
import LoginForm from './components/auth/login';
import Videos from './components/ott/videos';
import Live from './components/livetv';
import Subscribtion from './components/subscribtion/subscribtion';
import PaymentGateway from './components/paymentgateway';
import TopTenVote from './components/toptenvote';
import Vote from './components/vote';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="ott" element={<Ott />} />
        <Route path="videos" element={< Videos />} />
        {/* <Route path="login" element={<LoginPage />} /> */}
        <Route path="live" element={<Live />} />
        <Route path="subscribtion" element={<Subscribtion />} />
        <Route path="paymentgateway" element={<PaymentGateway />} />
        <Route path="toptenvote" element={<TopTenVote />} />
        <Route path="vote/:id" element={<Vote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

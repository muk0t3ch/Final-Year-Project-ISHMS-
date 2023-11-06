import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidenav from './Sidenav';
//import Admin from './components/Admin';
import Report from './components/Report';
import Database from './components/Database';
import Register from './components/Register';
import Scan from './components/Scan';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import HospitalPrescription from './components/HospitalPrescription';
import Alerts from './components/Alerts'; // Import the Alerts component



function App() {
  return (
    <div style={{ overflow: 'auto', height: '100vh' }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Signin} />

          <Route path="/report" component={() => <Sidenav page={<Report />} />} />
          <Route path="/database" component={() => <Sidenav page={<Database />} />} />
          <Route path="/register" component={() => <Sidenav page={<Register />} />} />
          <Route path="/hospitalprescription" component={() => <Sidenav page={<HospitalPrescription />} />} />
          <Route path="/scan" component={() => <Sidenav page={<Scan />} />} />
          <Route path="/about" component={() => <Sidenav page={<AboutUs />} />} />
          <Route exact path="/auth/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/auth/forgotpassword" component={ForgotPassword} />
          <Route path="/alerts" component={() => <Sidenav page={<Alerts />} />} />

        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

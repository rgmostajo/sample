import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from 'components/signup'

function App() {
  return (
    <Router>
        <Nav />
        <Route path="/customer/signup" component={ Signup } />
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DataProcess from './pages/DataProcess';
import DataAccess from './pages/DataAccess';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetails from './pages/EmployeeDetails';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/process" element={<DataProcess />} />
          <Route path="/access" element={<DataAccess />} />
          <Route path="/access/employees" element={<EmployeeList />} />
          <Route path="/access/employees/:empId" element={<EmployeeDetails />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

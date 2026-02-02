import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './main';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Employees from './Employees';
import Organization from './Organization';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/employees" replace />} />
          <Route path="employees" element={<Employees />} />
          <Route path="organization" element={<Organization />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;



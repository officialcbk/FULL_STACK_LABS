import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './main';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <Header />
      <Main/>
      <Footer />
    </div>
  );
};

export default App;



import {BrowserRouter, Routes, Route} from 'react-router-dom'

import NavBar from './components/Navbar';
import './App.css';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path='/' element = {<HomePage/>}></Route>
          </Routes>
        <Footer/>
      </BrowserRouter>
      
    </>
  );
}

export default App;

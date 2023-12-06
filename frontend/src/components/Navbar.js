import "../css/Navbar.css"
import React, { useState, useEffect }  from 'react'
import Modal from 'react-bootstrap/Modal';
import { Formik,Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import { ReactComponent as Logo } from '../images/logonav.svg';
import { ReactComponent as HamburgerLogo } from '../images/hambuger.svg';
import CreatePoll from "./CreatePoll";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'),''],'Passwords must match')
    .required("Confirm Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const Alert = ({ message,onClose }) => {

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <div className="alert">
      <p>{message}</p>
      <button className="close_button" onClick={handleClose}>
        Close
      </button>
    </div>
  );
};

function NavbarComponent() {

    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showRegisterModal, setShowRegisterModal] = useState(false)
    const [showCreatePollModal, setShowCreatePollModal] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState('');

    const handleLoginClick = () => {
        setShowLoginModal(true);
    };

    const handleCloseLoginModal = () => {
      setShowLoginModal(false);
    };
    
    const handleCloseCreatePollModal = () => {
      setShowCreatePollModal(false);
    };
    
    const handleCreatePollClick = () => {
      setShowCreatePollModal(true)
    };

    const handleRegisterClick = () => {
      setShowRegisterModal(true);
    };

    const handleCloseRegisterModal = () => {
      setShowRegisterModal(false);
    };
    
    const handleSubmitRegister = async (email,password) =>{
      try{
        const response = await axios.post('http://localhost:3001/user/register', {
          email,
          password,
        });
        setShowLoginModal(true);
        setShowRegisterModal(false);
        console.log('Registration successful', response.data);
      }catch(error){
        if (error.response && error.response.data && error.response.data.errorType === 'emailused') {
          alert('Email already exists.');
        }
        console.error("Error during registration:", error);
        
      }
    }
    const handleSubmitLogin = async(email,password) =>{
        try{
          const response = await axios.post('http://localhost:3001/user/login', {
            email,
            password,
          })
          const { token } = response.data;
          setAuthToken(token);
          setShowLoginModal(false);
          setIsLoggedIn(true)
          console.log('Login successful', response.data);
        }catch(error){
          if (error.response && error.response.data && error.response.data.errorType === 'noUser') {
            setAlertMessage('User not found');
          }
          if (error.response && error.response.data && error.response.data.errorType === 'wrongPass') {
            setAlertMessage('Incorrect password');
          }
          console.error("Error during login:", error);
        }
    }
    const handleLogout = () => {
      setAuthToken();
      localStorage.removeItem('jwtToken');
      setIsLoggedIn(false); 
    };

    useEffect(() => {
      const storedToken = localStorage.getItem('jwtToken');
      if (storedToken) {
        setAuthToken(storedToken);
        setIsLoggedIn(true);
      }
    }, []);

    const setAuthToken = (token) => {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('jwtToken', token);
      } else {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('jwtToken');
      }
    };

    useEffect(() => {
      function handleResize() {
        if (window.innerWidth > 768) {
          setIsOpen(false);
        }
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleCloseAlert = () => {
      setAlertMessage('');
    };
    
    return (
        <nav className={`nav ${isOpen ? 'menu-open' : ''}`}>
            <a href='/' className='logo'>
                <Logo/>
            </a>
            <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
              <HamburgerLogo/>
            </div>
            {(isOpen || window.innerWidth > 768) && (
              isLoggedIn ? (
                <ul>
                  <li>
                      <a href = "#" onClick={handleCreatePollClick}>Create poll</a>
                  </li>
                  <li>
                      <a href="#" onClick={handleLogout}>Log out</a>
                  </li>
                </ul>
              ) : (
                <ul>
                    <li>
                        <a href = "#" onClick={handleLoginClick}>Login</a>
                    </li>
                    <li>
                        <a href = "#" onClick={handleRegisterClick}>Register</a>
                    </li>
                </ul>
              )
            )}
            <Modal show={showLoginModal} onHide={handleCloseLoginModal} size='small' centered className={`blurred-background ${showLoginModal ? 'true' : ''}`} >
              <Modal.Header closeButton className="color_bg border-0">
              </Modal.Header>
              {alertMessage && <Alert message={alertMessage} onClose={handleCloseAlert}/>}
                <Formik
                  validationSchema={loginSchema}
                  initialValues={{ email: "", password: "" }}
                  onSubmit={(values) => {
                      // handleSubmitLogin(values.email,values.password)
                  }}
                  >
                  {(formik) => (
                    <div >
                      <form onSubmit={formik.handleSubmit} className="d-flex flex-column align-self-center align-items-center color_bg" >
                          <div className="login_form mt-1 mb-5">
                            <label className='login_label'> Login</label>
                          </div>
                          <Field  className= "email_field" placeholder = 'Email' name='email' type = 'mail'/>
                          <ErrorMessage name = 'email'/>
                          <Field className="password_field mt-4" placeholder = 'Password' name='password' type = 'password'/>
                          <ErrorMessage name = 'password'/>
                          <Modal.Footer className="border-0">
                          <button className= "button_style mt-5 mb-4" type='submit' onClick={() => {
                              if (!formik.errors.email && !formik.errors.password) {
                                handleSubmitLogin(formik.values.email, formik.values.password);
                              }
                            }}>
                              Login
                          </button>
                          </Modal.Footer>
                      </form>
                    </div>
                  )}
                </Formik>
            </Modal>
            <Modal show={showRegisterModal} onHide={handleCloseRegisterModal} centered  className={`blurred-background ${showLoginModal ? 'true' : ''}`} >
                <Modal.Header closeButton className="color_bg border-0">
                </Modal.Header >
                 {alertMessage && <Alert message={alertMessage} onClose={handleCloseAlert}/>}
                  <Formik
                    validationSchema={registerSchema}
                    initialValues={{ email: "", password: "", confirmPassword:"" }}
                    >
                    {(formik) => (
                      <div >
                        <form onSubmit={formik.handleSubmit} className="d-flex flex-column align-self-center align-items-center color_bg " >
                          <div className="login_form mt-1 mb-5">
                            <label className='login_label'> Register</label>
                          </div>   
                            
                            <Field className="email_field" placeholder = 'Email' name='email' type = 'mail'/>
                            <ErrorMessage name = 'email'/>
                            <Field className="password_field mt-4" placeholder = 'Password' name='password' type = 'password'/>
                            <ErrorMessage name = 'password'/>
                            <Field className="password_field mt-4" placeholder = 'Confirm password' name='confirmPassword' type = 'password'/>
                            <ErrorMessage name = 'confirmPassword'/>
                          <Modal.Footer className="border-0">
                            <button className= "button_style mt-4 mb-4" type='submit' onClick={() => {
                                if (!formik.errors.email && !formik.errors.password && !formik.errors.confirmPassword) {
                                   handleSubmitRegister(formik.values.email, formik.values.password);
                                }
                              }}>
                                Create account
                            </button>
                          </Modal.Footer>
                        </form>
                      </div>
                    )}
                  </Formik>
            </Modal>
            <Modal show={showCreatePollModal} size = 'lg'onHide={handleCloseCreatePollModal} centered className={`blurred-background ${showLoginModal ? 'true' : ''}`} >
              <Modal.Header closeButton className="login_label color_bg border-0">
                <Modal.Title>Create Poll</Modal.Title>
              </Modal.Header>
              <Modal.Body className="color_bg"> 
                  <CreatePoll/>   
              </Modal.Body>
              <Modal.Footer style={{ backgroundColor: 'rgba(4, 57, 94, 1)', border: 'none' }}>
              </Modal.Footer>
            </Modal>
         </nav>
    );
  }
  
export default NavbarComponent;
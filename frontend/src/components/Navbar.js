import "../css/Navbar.css"
import logo from '../images/logo.png'
import React, {useState}  from 'react'
import Modal from 'react-bootstrap/Modal';
import { Formik,Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios'


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

function NavbarComponent() {

    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showRegisterModal, setShowRegisterModal] = useState(false)
    const [showCreatePollModal, setShowCreatePollModal] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLoginStatus = (status) => {
      setIsLoggedIn(status);
    };

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
    }
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
        console.error("Error during registration:", error);
        
      }
    }
    const handleSubmitLogin = async(email,password) =>{
        try{
          const response = await axios.post('http://localhost:3001/user/login', {
            email,
            password,
            
          });
          setShowLoginModal(false);
          handleLoginStatus(true)
          console.log('Login successful', response.data);
        }catch(error){
          console.error("Error during login:", error);
          
        }
    }
    const handleLogout = () => {
      
      setIsLoggedIn(false); 
    };
    
    return (
        <nav className='nav'>
            <a href='/' className='logo'>
                <img src={logo} alt=''></img>
            </a>
            {isLoggedIn ? (
             <ul>
               <li>
                   <a href = "#" onClick={handleCreatePollClick}>Create poll</a>
               </li>
               <li>
                   <a href="#" onClick={handleLogout}>Log out</a>
               </li>
            </ul>):(
              <ul>
              <li>
                  <a href = "#" onClick={handleLoginClick}>Login</a>
              </li>
              <li>
                  <a href = "#" onClick={handleRegisterClick}>Register</a>
              </li>
          </ul>
            )}
            <Modal show={showLoginModal} onHide={handleCloseLoginModal} size='small' centered  >
              <Modal.Header closeButton className="color_bg border-0">
              </Modal.Header>
                <Formik
                  validationSchema={loginSchema}
                  initialValues={{ email: "", password: "" }}
                  onSubmit={(values) => {
                      handleSubmitLogin(values.email,values.password)
                  }}
                  >
                  {(formik) => (
                    <div >
                      <form onSubmit={formik.handleSubmit} className="d-flex flex-column align-self-center align-items-center color_bg" >
                          <div className="login_form mt-1 mb-5">
                            <label className='login_label'> Login</label>
                          </div>
                          
                          <Field placeholder = 'Email' name='email' type = 'mail'
                           style={{
                            background: 'transparent',
                            border: '2px solid white',
                            borderRadius: '8px', 
                            color: 'white', 
                            padding: '6px', 
                            width: '80%'
                          }}
                         />
                          <ErrorMessage name = 'email'/>
                          <Field className="mt-4" placeholder = 'Password' name='password' type = 'password'
                          style={{
                            background: 'transparent',
                            border: '2px solid white',
                            borderRadius: '8px', 
                            color: 'white', 
                            padding: '6px', 
                            width: '80%',
                            marginTop: '10px'
                          }}/>
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
            <Modal show={showRegisterModal} onHide={handleCloseRegisterModal} centered   >
                <Modal.Header closeButton className="color_bg border-0">
                </Modal.Header >
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
                            
                            <Field placeholder = 'Email' name='email' type = 'mail'
                            style={{
                              background: 'transparent',
                              border: '2px solid white',
                              borderRadius: '8px', 
                              color: 'white', 
                              padding: '6px', 
                              width: '80%'
                            }}
                          />
                            <ErrorMessage name = 'email'/>
                            <Field className="mt-4" placeholder = 'Password' name='password' type = 'password'
                            style={{
                              background: 'transparent',
                              border: '2px solid white',
                              borderRadius: '8px', 
                              color: 'white', 
                              padding: '6px', 
                              width: '80%',
                              marginTop: '10px'
                            }}/>
                            <ErrorMessage name = 'password'/>
                            <Field className="mt-4" placeholder = 'Confirm password' name='confirmPassword' type = 'password'
                            style={{
                              background: 'transparent',
                              border: '2px solid white',
                              borderRadius: '8px', 
                              color: 'white', 
                              padding: '6px', 
                              width: '80%',
                              marginTop: '10px'
                            }}/>
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
            <Modal show={showCreatePollModal} onHide={handleCreatePollClick} size='small' centered  >

            </Modal>
         </nav>
    );
  }
  
export default NavbarComponent;
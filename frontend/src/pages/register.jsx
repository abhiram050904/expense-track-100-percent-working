import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from "../images/loginimg.webp";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { RegisterRoute } from "../apiroutes";
import bg from '../images/bg2.jpg';
import avatar from '../images/avatar2.png';

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate("/");
        }
    }, [navigate]);

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be the same.", toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters.", toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error("Password should be equal or greater than 8 characters.", toastOptions);
            return false;
        } else if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.", toastOptions);
            return false;
        }
        return true;
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            setLoading(true);
            const { email, username, password } = values;
            try {
                const { data } = await axios.post(RegisterRoute, {
                    username,
                    email,
                    password,
                });

                setLoading(false);
                if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                } else if (data.status === true) {
                    localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                    localStorage.setItem('userId', data.user._id);
                    navigate("/");
                }
            } catch (error) {
                setLoading(false);
                toast.error("Registration failed. Please try again.", toastOptions);
                console.error(error);
            }
        }
    };

    return (
        <>
            <FormContainer>
                <ImageContainer>
                    <img src={Logo} alt="logo" />
                </ImageContainer>
                <FormWrapper>
                    <form onSubmit={handleSubmit}>
                    <div className="brand">
                         <img src={avatar} alt="logo" />
                            <h1>Expense-Tracker</h1>
                     </div>
                        <InputContainer>
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                onChange={handleChange}
                                required
                            />
                        </InputContainer>
                        <button type="submit" disabled={loading}>
                            {loading ? "Creating User..." : "Create User"}
                        </button>
                        <span>
                            Already have an account? <Link to="/login">Login.</Link>
                        </span>
                    </form>
                </FormWrapper>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center; 
    align-items: center; 
    background-image: url(${bg});
    background-size: cover;
    background-position: center;

    .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: black;
      text-transform: uppercase;
    }
  }
`;

const ImageContainer = styled.div`
    flex: 1; 
    display: flex;
    justify-content: center;
    align-items: center;
    
    img {
        max-width: 100%; 
        height: 70vh; 
    }
`;

const FormWrapper = styled.div`
    flex: 0.9; 
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    margin-left: -5%; 

    h1 {
        color: #242928; 
        font-size: 2.5rem; 
        text-align: center; 
        margin-bottom: 2rem; 
    }

    form {
        background-color: rgba(252, 246, 249, 0.78);
        border: 3px solid #ffffff;
        border-radius: 1.5rem; 
        padding: 3rem 5rem;
        box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1); 
        display: flex;
        flex-direction: column;
        gap: 1rem; 
    }

    button {
        background-color: #5c60e6; 
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: background-color 0.3s ease, transform 0.3s ease; 

        &:hover {
            background-color: green; 
            transform: scale(1.05); 
        }
        
        &:disabled {
            background-color: #ccc; 
            cursor: not-allowed; 
        }
    }

    span {
        color: black; 
        text-transform: uppercase;
        a {
            color: #4e0eff;
            text-decoration: none;
            font-weight: bold;
        }
    }

    img {
        width: 100px; // Adjust the width as needed
        height: auto; // Maintain aspect ratio
        margin-bottom: 1rem; // Add spacing if needed
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    width: 100%; 

    input {
        background-color: transparent;
        padding: 1rem;
        margin: 1rem;
        border-radius: 20px;
        border: 2px solid #3de3c2;
        color: black;
        width: 100%;
        font-size: 1rem;
        transition: border 0.3s ease, transform 0.3s ease; 

        &:focus {
            border: 2px solid #4e0eff; 
            outline: none;
            transform: scale(1.02); 
        }

        &:hover {
            border: 2px solid #997af0; 
            transform: scale(1.01); 
        }
    }
`;

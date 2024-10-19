import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { LoginRoute } from "../apiroutes";
import bg from '../images/bg2.jpg';
import img from '../images/loginimg.webp';
import avatar from  '../images/avatar2.png'
export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Loading state
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate("/");
        }
    }, [navigate]);

    const handleValidation = () => {
        const { username, password } = values;
        if (username === "") {
            toast.error("Username is required.", toastOptions);
            return false;
        } else if (password === "") {
            toast.error("Password is required.", toastOptions);
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
            setLoading(true); // Start loading
            const { username, password } = values;
            try {
                const { data } = await axios.post(LoginRoute, {
                    username,
                    password,
                });

                setLoading(false); // End loading
                if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                } else if (data.status === true) {
                    localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                    localStorage.setItem('userId', data.user._id); // Store user ID in local storage
                    navigate("/");
                }
            } catch (error) {
                setLoading(false); // End loading
                toast.error("Login failed. Please try again.", toastOptions);
                console.error(error); 
            }
        }
    };

    return (
        <>
            <FormContainer>
                <ImageContainer>
                    <img src={img} alt="Login" />
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
                                minLength="3"
                                required
                                aria-label="Username"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                required
                                aria-label="Password"
                            />
                        </InputContainer>
                        <button type="submit" disabled={loading}>
                            {loading ? "Logging In..." : "Log In"}
                        </button>
                        <span>
                            Don't have an account? <Link to="/register">Create One.</Link>
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
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
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
    flex: 1; /* Take up 1/2 of the container */
    display: flex;
    justify-content: center;
    align-items: center;
    
    img {
        max-width: 100%; /* Adjusted for better sizing */
        height: 70vh; /* Maintain aspect ratio */
    }
`;

const FormWrapper = styled.div`
    flex: 0.9; /* Take up slightly less space than the ImageContainer */
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center form vertically */
    align-items: center;
    margin-left: -5%; /* Adjusted margin to move the form slightly left */

    h1 {
        color: #242928; /* Updated color */
        font-size: 2.5rem; /* Slightly reduced size */
        text-align: center; /* Centered text */
        margin-bottom: 2rem; /* Remove margin */
    }

    form {
        background-color: rgba(252, 246, 249, 0.78);
        border: 3px solid #ffffff;
        border-radius: 1.5rem; /* Added border radius */
        padding: 3rem 5rem;
        box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1); /* Adding subtle shadow */
        display: flex;
        flex-direction: column;
        gap: 1rem; /* Reduced gap between inputs */
    }

    button {
        background-color:#5c60e6; /* Button color */
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: background-color 0.3s ease, transform 0.3s ease; /* Added transition */

        &:hover {
            background-color: green; /* Change color on hover */
            transform: scale(1.05); /* Increase size on hover */
        }
        
        &:disabled {
            background-color: #ccc; /* Disable button style */
            cursor: not-allowed; /* Change cursor */
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
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /* Center input fields */
    width: 100%; /* Ensure it takes full width of the form */

    input {
        background-color: transparent;
        padding: 1rem;
        margin: 1rem;
        border-radius: 20px;
        border: 2px solid #3de3c2;
        color: black;
        width: 100%;
        font-size: 1rem;
        transition: border 0.3s ease, transform 0.3s ease; /* Added transition for smooth effect */

        &:focus {
            border: 2px solid #4e0eff; /* Change border color on focus */
            outline: none;
            transform: scale(1.02); /* Slightly increase size on focus */
        }

        &:hover {
            border: 2px solid #997af0; /* Change border color on hover */
            transform: scale(1.01); /* Slightly increase size on hover */
        }
    }
`;

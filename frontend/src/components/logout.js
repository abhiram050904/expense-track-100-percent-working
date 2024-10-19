import React from 'react';
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import styled from "styled-components";

export default function Logout() {
  const navigate = useNavigate();
  
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <LogoutStyled onClick={handleClick}>
      <FiLogOut />
      <span>LOG OUT</span>
    </LogoutStyled>
  );
}

const LogoutStyled = styled.li`
  display: flex;
  align-items: center;
  margin: 0.4rem 0;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  color: rgba(34, 34, 96, .6);
  padding-left: 1rem;
  padding: 0.5rem;
  border-radius: 8px;

  &:hover {
    background: rgba(255, 0, 0, 0.1); /* Red background on hover */
    color: red; /* Red text color on hover */
    transform: scale(1.05); /* Slight increase in size */
  }

  svg {
    margin-right: 8px; /* Space between icon and text */
  }
`;

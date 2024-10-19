import React from 'react';
import styled from 'styled-components';

function Button({ name, icon, onClick, bg, bPad, color, bRad, hoverColor, hoverSize }) {
    return (
        <ButtonStyled 
            style={{
                background: bg,
                padding: bPad,
                borderRadius: bRad,
                color: color,
            }} 
            onClick={onClick}
            hoverColor={hoverColor}
            hoverSize={hoverSize}
        >
            {icon}
            {name}
        </ButtonStyled>
    );
}

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .4s ease-in-out;

    &:hover {
        background: ${({ hoverColor }) => hoverColor || 'inherit'}; /* Change background on hover */
        transform: scale(${({ hoverSize }) => hoverSize || '1'}); /* Change size on hover */
    }
`;

export default Button;

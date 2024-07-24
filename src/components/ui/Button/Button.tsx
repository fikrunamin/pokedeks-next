import styled from "styled-components";
import React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const StyledButton = styled.button`
    display: inline-flex; 
    padding-top: 0.75rem;
    padding-bottom: 0.75rem; 
    padding-left: 1rem;
    padding-right: 1rem; 
    column-gap: 0.5rem; 
    align-items: center;
    border-radius: 0.5rem; 
    border-width: 1px; 
    border-color: transparent; 
    font-size: 0.875rem;
    line-height: 1.25rem; 
    font-weight: 500; 
    color: #ffffff; 
    background-color: #2563EB; 
    justify-content: center;

    &:hover {
        background-color: #1D4ED8; 
    }

    &:disabled {
        pointer-events: none; 
        opacity: 0.5; 
    }
`;

function Button({ children, ...props }: IButtonProps) {
    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    );
}

export default Button;